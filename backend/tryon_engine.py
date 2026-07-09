import cv2
import numpy as np
import mediapipe as mp
from PIL import Image
from rembg import remove

mp_pose = mp.solutions.pose

# ─────────────────────────────────────────────────────────────────────────────
# V13 — EDGE COHERENCE PATCH + ELBOW/RIB-PIN PATCH
#
# FIXES over V12 (hole-fix patch):
# ✓ Removed hard erode() on garment alpha — it was creating a jagged
#   "staircase" edge on diagonal sleeve boundaries. Replaced with a soft
#   feather (GaussianBlur) so the edge stays smooth at any angle.
# ✓ Removed the hard threshold (np.where(alpha>60,255,0)) on the warped
#   garment alpha before compositing. Hard-thresholding + a separately
#   blurred containment mask is what produced the scalloped/beaded
#   gap pattern down both arms — the two edges never shared the same
#   curve, so wherever they crossed you got a notch.
# ✓ soft_alpha blur widened 3×3 → 9×9 to match the scale of contain_f's
#   blur, so the two masks feather at comparable rates and their
#   intersection doesn't alias.
# ✓ contain mask now built with elliptical structuring elements
#   instead of square ones (square kernels bias dilation into
#   diagonal "steps" — exactly the beaded look on angled forearms).
# ✓ Neckline: torso top boundary raised to match the TPS neck target
#   point, closing the collar gap.
#
# NEW IN THIS PATCH (tps_torso only):
# ✓ Added elbow anchor points (right/left) so the sleeve fabric itself
#   bends at the elbow to match arm_corridor_mask's bend, instead of
#   staying straight underneath a bent visibility mask (which was
#   causing the visible elbow kink/notch).
# ✓ Added rib/underarm "pin" anchor points (right/left) so the elbow
#   correction above can't ripple sideways through the TPS's global
#   deformation field and drag the torso side seam inward — that
#   ripple was exposing the underlying garment layer at the ribs
#   after the elbow-only fix was first tried.
# ✓ All original 6 torso/waist/shoulder/hem control points are
#   completely unchanged — new points are appended, not substituted.
# ─────────────────────────────────────────────────────────────────────────────


def remove_bg(cloth_rgb):
    rgba = remove(Image.fromarray(cloth_rgb))
    arr = np.array(rgba)

    bgr = cv2.cvtColor(arr[:, :, :3], cv2.COLOR_RGB2BGR)
    alpha = arr[:, :, 3]

    # FIX: erosion was carving a jagged edge into diagonal garment
    # boundaries (sleeves). A soft feather keeps edges smooth and
    # matches the blur radius used downstream during compositing.
    alpha = cv2.GaussianBlur(alpha, (5, 5), 0)

    coords = cv2.findNonZero(alpha)

    if coords is None:
        return bgr, alpha

    x, y, w, h = cv2.boundingRect(coords)

    return (
        bgr[y:y+h, x:x+w],
        alpha[y:y+h, x:x+w]
    )


# ─────────────────────────────────────────────────────────────────────────────

def get_landmarks(img_rgb):

    with mp_pose.Pose(
        static_image_mode=True,
        model_complexity=2,
        enable_segmentation=True
    ) as pose:

        res = pose.process(img_rgb)

    if not res.pose_landmarks:
        return None, None

    h, w = img_rgb.shape[:2]

    def pt(i):
        lm = res.pose_landmarks.landmark[i]
        return np.array(
            [lm.x * w, lm.y * h],
            dtype=np.float32
        )

    ls = pt(11)
    rs = pt(12)

    le = pt(13)
    re = pt(14)

    lw = pt(15)
    rw = pt(16)

    lh = pt(23)
    rh = pt(24)

    nose = pt(0)

    neck = (ls + rs) / 2.0

    sw = float(np.linalg.norm(ls - rs))

    return dict(
        ls=ls,
        rs=rs,
        le=le,
        re=re,
        lw=lw,
        rw=rw,
        lh=lh,
        rh=rh,
        nose=nose,
        neck=neck,
        sw=sw
    ), res.segmentation_mask


# ─────────────────────────────────────────────────────────────────────────────
# TORSO REGION
# ─────────────────────────────────────────────────────────────────────────────

def torso_fill_mask(kp, shape):

    H, W = shape[:2]

    sw = kp["sw"]

    # FIX: top raised from -0.2*sw to -0.35*sw so it clears the TPS
    # neck target (neck - 0.12*sw) with margin — closes the collar gap.
    top = int(min(kp["ls"][1], kp["rs"][1]) - sw * 0.35)

    bottom = int(max(kp["lh"][1], kp["rh"][1]) + sw * 0.10)

    left = int(min(kp["ls"][0], kp["rs"][0]) - sw * 0.70)

    right = int(max(kp["ls"][0], kp["rs"][0]) + sw * 0.70)

    top = max(0, top)
    bottom = min(H, bottom)

    left = max(0, left)
    right = min(W, right)

    mask = np.zeros((H, W), np.uint8)

    mask[top:bottom, left:right] = 255

    # FIX: elliptical kernel avoids the diagonal "staircase" bias
    # of a square kernel when dilating a rectangular seed region.
    ellipse = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25))

    mask = cv2.dilate(mask, ellipse, iterations=1)

    return mask


# ─────────────────────────────────────────────────────────────────────────────
# ARM REGION
# ─────────────────────────────────────────────────────────────────────────────

def arm_corridor_mask(kp, shape):

    H, W = shape[:2]

    sw = kp["sw"]

    mask = np.zeros((H, W), np.uint8)

    arm_r = int(sw * 0.26)

    def draw_capsule(m, p1, p2, radius):

        p1i = tuple(
            np.clip(p1, [0, 0], [W - 1, H - 1]).astype(int)
        )

        p2i = tuple(
            np.clip(p2, [0, 0], [W - 1, H - 1]).astype(int)
        )

        cv2.line(m, p1i, p2i, 255, radius * 2)
        cv2.circle(m, p1i, radius, 255, -1)
        cv2.circle(m, p2i, radius, 255, -1)

    draw_capsule(mask, kp["rs"], kp["re"], arm_r)
    draw_capsule(mask, kp["re"], kp["rw"], arm_r)

    draw_capsule(mask, kp["ls"], kp["le"], arm_r)
    draw_capsule(mask, kp["le"], kp["lw"], arm_r)

    bridge_r = int(sw * 0.28)

    for sh in [kp["rs"], kp["ls"]]:
        pt = tuple(
            np.clip(sh, [0, 0], [W - 1, H - 1]).astype(int)
        )
        cv2.circle(mask, pt, bridge_r, 255, -1)

    wrist_r = int(sw * 0.8)

    cv2.circle(
        mask,
        tuple(np.clip(kp["rw"], [0, 0], [W-1, H-1]).astype(int)),
        wrist_r,
        255,
        -1
    )

    cv2.circle(
        mask,
        tuple(np.clip(kp["lw"], [0, 0], [W-1, H-1]).astype(int)),
        wrist_r,
        255,
        -1
    )

    # FIX: elliptical kernel for the closing pass instead of square —
    # this is the main source of the beaded pattern along the forearms,
    # since a square kernel closes gaps unevenly depending on the local
    # angle of the sleeve edge relative to the kernel's axes.
    ellipse = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25))

    mask = cv2.morphologyEx(
        mask,
        cv2.MORPH_CLOSE,
        ellipse,
        iterations=3
    )

    return mask


# ─────────────────────────────────────────────────────────────────────────────
# GARMENT PLACEMENT (unchanged)
# ─────────────────────────────────────────────────────────────────────────────

def place_garment(g_bgr, g_alpha, kp, canvas_shape):

    H, W = canvas_shape[:2]

    sw = kp["sw"]

    gh, gw = g_bgr.shape[:2]

    target_w = sw * 2.15

    scale = target_w / gw

    new_w = int(gw * scale)
    new_h = int(gh * scale)

    g_scaled = cv2.resize(
        g_bgr,
        (new_w, new_h),
        interpolation=cv2.INTER_LANCZOS4
    )

    a_scaled = cv2.resize(
        g_alpha,
        (new_w, new_h),
        interpolation=cv2.INTER_LANCZOS4
    )

    cx = int(kp["neck"][0])

    cy = int(kp["neck"][1] - new_h * 0.10)

    tx = cx - new_w // 2
    ty = cy

    full_bgr = np.zeros((H, W, 3), np.uint8)
    full_alpha = np.zeros((H, W), np.uint8)

    x1 = max(0, tx)
    y1 = max(0, ty)

    x2 = min(W, tx + new_w)
    y2 = min(H, ty + new_h)

    gx1 = x1 - tx
    gy1 = y1 - ty

    gx2 = gx1 + (x2 - x1)
    gy2 = gy1 + (y2 - y1)

    full_bgr[y1:y2, x1:x2] = g_scaled[gy1:gy2, gx1:gx2]
    full_alpha[y1:y2, x1:x2] = a_scaled[gy1:gy2, gx1:gx2]

    return full_bgr, full_alpha


# ─────────────────────────────────────────────────────────────────────────────
# TPS WARP — torso/shoulder/hip/hem anchors (unchanged) + NEW elbow
# and rib-pin anchors (this patch)
# ─────────────────────────────────────────────────────────────────────────────

def tps_torso(full_bgr, full_alpha, kp, canvas_shape):

    coords = cv2.findNonZero(full_alpha)

    if coords is None:
        return full_bgr, full_alpha

    bx, by, bw, bh = cv2.boundingRect(coords)

    sw = kp["sw"]

    neck = kp["neck"]

    def sp(fx, fy):
        return [
            bx + bw * fx,
            by + bh * fy
        ]

    # ── ORIGINAL 6 anchors — waist/shoulder/hip/hem behavior is
    # preserved exactly, untouched by this patch.
    src_pts = np.array([
        sp(0.50, 0.04),
        sp(0.18, 0.10),
        sp(0.82, 0.10),
        sp(0.22, 0.94),
        sp(0.78, 0.94),
        sp(0.50, 0.55),
    ], dtype=np.float32)

    dst_pts = np.array([

        neck - [0, sw * 0.18],

        kp["rs"] - [sw * 0.06, -sw * 0.005],

        kp["ls"] + [sw * 0.06, sw * 0.005],

        kp["rh"] - [sw * 0.10, -sw * 0.03],

        kp["lh"] + [sw * 0.10, sw * 0.0002],

        neck + [0, sw * 0.60],

    ], dtype=np.float32)

    # ── NEW: elbow anchors, based on the actual garment image —
    # sleeve bend sits ~45% down, near the outer edge of the garment
    # crop. This makes the sleeve fabric itself bend at the elbow to
    # match arm_corridor_mask's bend, fixing the elbow kink/notch.
    src_pts = np.concatenate([src_pts, np.array([
        sp(0.096, 0.56),   # right elbow (garment space)
        sp(0.96, 0.56),   # left elbow (garment space)
    ], dtype=np.float32)])

    dst_pts = np.concatenate([dst_pts, np.array([
        kp["re"] - [sw * 0.12, -sw * 0.003],
        kp["le"] + [sw * 0.20, sw * 0.006],
    ], dtype=np.float32)])

    # ── NEW: rib / underarm "pin" anchors — locks the torso side
    # seam in place so the elbow correction above can't ripple
    # sideways through the TPS's global deformation field and drag
    # the torso side edge inward (which was exposing the underlying
    # garment layer at the ribs).
    src_pts = np.concatenate([src_pts, np.array([
        sp(0.20, 0.30),   # right rib / underarm (garment space)
        sp(0.80, 0.30),   # left rib / underarm (garment space)
    ], dtype=np.float32)])

    dst_pts = np.concatenate([dst_pts, np.array([
        kp["rs"] + [(kp["rh"][0] - kp["rs"][0]) * 0.15, sw * 0.30],
        kp["ls"] + [(kp["lh"][0] - kp["ls"][0]) * 0.15, sw * 0.30],
    ], dtype=np.float32)])

    tps = cv2.createThinPlateSplineShapeTransformer()

    matches = [
        cv2.DMatch(i, i, 0)
        for i in range(len(src_pts))
    ]

    tps.estimateTransformation(
        dst_pts.reshape(1, -1, 2),
        src_pts.reshape(1, -1, 2),
        matches
    )

    warped_bgr = tps.warpImage(full_bgr)

    warped_alpha = tps.warpImage(full_alpha)

    return warped_bgr, warped_alpha


# ─────────────────────────────────────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────────────────────────────────────

def process_tryon(user_rgb, cloth_rgb):

    kp, seg_mask = get_landmarks(user_rgb)

    if kp is None:
        return cv2.cvtColor(
            user_rgb,
            cv2.COLOR_RGB2BGR
        )

    H, W = user_rgb.shape[:2]

    user_bgr = cv2.cvtColor(
        user_rgb,
        cv2.COLOR_RGB2BGR
    )

    g_bgr, g_alpha = remove_bg(cloth_rgb)

    placed_bgr, placed_alpha = place_garment(
        g_bgr,
        g_alpha,
        kp,
        user_rgb.shape
    )

    warped_bgr, warped_alpha = tps_torso(
        placed_bgr,
        placed_alpha,
        kp,
        user_rgb.shape
    )

    if seg_mask is not None:

        body = (seg_mask > 0.35).astype(np.uint8) * 255

        ellipse = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (25, 25))

        body = cv2.dilate(
            body,
            ellipse,
            iterations=2
        )

    else:
        body = np.ones((H, W), np.uint8) * 255

    torso = torso_fill_mask(kp, user_rgb.shape)

    arms = arm_corridor_mask(kp, user_rgb.shape)

    contain = cv2.bitwise_or(body, torso)
    contain = cv2.bitwise_or(contain, arms)

    # FIX: wider blur (11→21) so contain_f's falloff rate matches
    # soft_alpha's falloff rate — mismatched falloff rates were the
    # other half of the beading artifact (see soft_alpha below).
    contain_f = cv2.GaussianBlur(
        contain.astype(float),
        (21, 21),
        0
    ) / 255.0

    # FIX: no more hard threshold. warped_alpha already has a clean,
    # anti-aliased edge (rembg + our soft feather in remove_bg), so
    # thresholding it back to 0/255 was throwing that away and
    # reintroducing a jagged edge right before compositing.
    soft_alpha = cv2.GaussianBlur(
        warped_alpha.astype(float),
        (9, 9),
        0
    ) / 255.0

    final_alpha = soft_alpha * contain_f

    final_alpha = final_alpha[:, :, None]

    canvas = user_bgr.astype(float)

    result = (
        warped_bgr.astype(float) * final_alpha +
        canvas * (1.0 - final_alpha)
    ).astype(np.uint8)

    restore = np.zeros((H, W), np.uint8)

    sw = kp["sw"]

    alpha_r = cv2.GaussianBlur(
        restore,
        (19, 19),
        0
    ).astype(float) / 255.0

    final = (
        user_bgr.astype(float) * alpha_r[:, :, None] +
        result.astype(float) * (1.0 - alpha_r[:, :, None])
    ).astype(np.uint8)

    return final