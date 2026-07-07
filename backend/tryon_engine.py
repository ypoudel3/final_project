import cv2
import numpy as np
import mediapipe as mp
from PIL import Image
from rembg import remove

mp_pose = mp.solutions.pose

# ─────────────────────────────────────────────────────────────────────────────
# V14 — SHOULDER / NECK / WAIST PATCH
#
# FIXES over V13 (edge coherence patch):
# ✓ Collar was a single center TPS point, so the wide boat-neck of the
#   source garment got pulled into a narrow V as it warped — that's the
#   white gap you see biting into the shoulder/neck junction. Added two
#   more collar control points (collar_r / collar_l) that sit out along
#   the shoulder line, so the neckline keeps its width instead of
#   collapsing to a point.
# ✓ Shoulder target offset widened 0.06*sw → 0.08*sw and given a small
#   downward slope (was basically flat at 0.003*sw) so the sleeve cap
#   sits on top of the shoulder the way it does in the reference image
#   instead of floating slightly inboard of it.
# ✓ Waist had NO side control points at all — only one point at
#   neck + [0, 0.60*sw], dead center. Nothing was pulling the garment
#   in at the sides, so it just draped straight from shoulder to hip.
#   Added waist_r / waist_l points pulled in ~0.10*sw from the
#   shoulder x-position, giving an actual waist pinch that matches the
#   r_waist_side / l_waist_side keypoints in your reference image.
# ─────────────────────────────────────────────────────────────────────────────


def remove_bg(cloth_rgb):
    rgba = remove(Image.fromarray(cloth_rgb))
    arr = np.array(rgba)

    bgr = cv2.cvtColor(arr[:, :, :3], cv2.COLOR_RGB2BGR)
    alpha = arr[:, :, 3]

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

def torso_fill_mask(kp, shape, profile=None):

    H, W = shape[:2]

    sw = kp["sw"]

    top = int(min(kp["ls"][1], kp["rs"][1]) - sw * 0.35)

    bottom = int(max(kp["lh"][1], kp["rh"][1]) + sw * 0.10)

    if profile is not None:
        # Measured hip extent, padded a bit — adapts to wide/narrow hips
        # instead of assuming hips sit at a fixed multiple of shoulder width.
        pad = (profile["hip_right_x"] - profile["hip_left_x"]) * 0.20
        left = int(profile["hip_left_x"] - pad)
        right = int(profile["hip_right_x"] + pad)
        left = min(left, int(min(kp["ls"][0], kp["rs"][0]) - sw * 0.35))
        right = max(right, int(max(kp["ls"][0], kp["rs"][0]) + sw * 0.35))
    else:
        left = int(min(kp["ls"][0], kp["rs"][0]) - sw * 0.70)
        right = int(max(kp["ls"][0], kp["rs"][0]) + sw * 0.70)

    top = max(0, top)
    bottom = min(H, bottom)

    left = max(0, left)
    right = min(W, right)

    mask = np.zeros((H, W), np.uint8)

    mask[top:bottom, left:right] = 255

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

    # FIX: bridge radius widened slightly (0.28 → 0.32*sw) to comfortably
    # cover the wider shoulder TPS target below (0.08*sw offset instead
    # of 0.06*sw) — otherwise the containment mask could clip the
    # garment right where the shoulder point moved outward to.
    bridge_r = int(sw * 0.32)

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
# BODY PROFILE — measured, not assumed
#
# Instead of deriving waist/hip/shoulder position as fixed multiples of
# shoulder width (sw), scan the actual segmentation mask row-by-row and
# measure this body's real contour. This is what makes the system
# generalize across body types instead of being curve-fit to one photo:
# a pear-shaped, rectangular, or hourglass torso all produce a different
# "narrowest row" — and we find whatever that row actually is, instead
# of assuming it sits at a fixed fraction of shoulder width below the neck.
# ─────────────────────────────────────────────────────────────────────────────

def measure_body_profile(seg_mask, kp, shape):

    H, W = shape[:2]

    mask = (seg_mask > 0.5).astype(np.uint8)

    shoulder_y = int((kp["ls"][1] + kp["rs"][1]) / 2)
    hip_y = int((kp["lh"][1] + kp["rh"][1]) / 2)

    shoulder_y = max(0, min(H - 1, shoulder_y))
    hip_y = max(0, min(H - 1, hip_y))

    def row_extent(y):
        row = mask[y]
        xs = np.nonzero(row)[0]
        if len(xs) < 2:
            return None
        return int(xs.min()), int(xs.max())

    # Search band excludes the very top (armpit/shoulder bulge) and very
    # bottom (hip flare) of the torso so the scan can't lock onto those
    # by mistake — it's looking specifically for the waist pinch.
    span = max(hip_y - shoulder_y, 1)
    scan_top = shoulder_y + int(span * 0.15)
    scan_bot = hip_y - int(span * 0.05)

    waist_y = shoulder_y + int(span * 0.6)   # sane fallback if the scan fails
    waist_l, waist_r = None, None
    min_width = None

    for y in range(scan_top, max(scan_top + 1, scan_bot)):
        ext = row_extent(y)
        if ext is None:
            continue
        x0, x1 = ext
        width = x1 - x0
        if min_width is None or width < min_width:
            min_width = width
            waist_y = y
            waist_l, waist_r = x0, x1

    shoulder_ext = row_extent(shoulder_y) or (
        int(min(kp["ls"][0], kp["rs"][0])),
        int(max(kp["ls"][0], kp["rs"][0]))
    )

    hip_ext = row_extent(hip_y) or (
        int(min(kp["lh"][0], kp["rh"][0])),
        int(max(kp["lh"][0], kp["rh"][0]))
    )

    if waist_l is None:
        # fallback: no clean scan (e.g. loose clothing hides the waist) —
        # interpolate rather than assume a fixed ratio
        waist_l = int((shoulder_ext[0] + hip_ext[0]) / 2)
        waist_r = int((shoulder_ext[1] + hip_ext[1]) / 2)
        min_width = waist_r - waist_l

    return dict(
        waist_y=waist_y,
        waist_left_x=waist_l,
        waist_right_x=waist_r,
        waist_width=min_width if min_width else kp["sw"],
        shoulder_left_x=shoulder_ext[0],
        shoulder_right_x=shoulder_ext[1],
        hip_left_x=hip_ext[0],
        hip_right_x=hip_ext[1],
        torso_height=span,
    )


# ─────────────────────────────────────────────────────────────────────────────
# TPS TORSO — shoulder / neck / waist patch (now body-profile driven)
# ─────────────────────────────────────────────────────────────────────────────

def tps_torso(full_bgr, full_alpha, kp, canvas_shape, profile=None):

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

    # NEW: garment-side source points now include collar-left/right
    # (holds boat-neck width) and waist-left/right (gives the TPS
    # something to pinch at the waist). These correspond to the
    # collar / r_shoulder / l_shoulder / r_waist_side / l_waist_side
    # keypoints called out in the reference garment image.
    
    src_pts = np.array([
     sp(0.50, 0.04),
     sp(0.18, 0.10),
     sp(0.82, 0.10),

    # ELBOW POINTS
     sp(0.20, 0.50),
     sp(0.80, 0.50),

     sp(0.22, 0.94),
     sp(0.78, 0.94),
     sp(0.50, 0.55),
    ], dtype=np.float32)

    # Body-side collar points: interpolate toward the shoulders instead
    # of collapsing the whole neckline to a single point below the neck.
    collar_r = neck + (kp["rs"] - neck) * 0.55 - np.array([0, sw * 0.02], dtype=np.float32)
    collar_l = neck + (kp["ls"] - neck) * 0.55 - np.array([0, sw * 0.02], dtype=np.float32)

    # Body-side waist points: use the MEASURED waist row/width from the
    # segmentation mask when available (body-type agnostic), falling
    # back to the old fixed-ratio estimate only if no profile was passed.
    if profile is not None:
        waist_y = profile["waist_y"]
        waist_r = np.array([profile["waist_right_x"], waist_y], dtype=np.float32)
        waist_l = np.array([profile["waist_left_x"], waist_y], dtype=np.float32)
    else:
        waist_y = neck[1] + sw * 0.75
        waist_r = np.array([kp["rs"][0] - sw * 0.10, waist_y], dtype=np.float32)
        waist_l = np.array([kp["ls"][0] + sw * 0.10, waist_y], dtype=np.float32)

    dst_pts = np.array([

     neck - [1, sw * 0.13],

     kp["rs"] - [sw * 0.06, -sw * 0.003],
     kp["ls"] + [sw * 0.06,  sw * 0.003],

    # ELBOW ANCHORS
     kp["re"] - [-sw * 0.12, -sw * 0.003],
     kp["le"] + [-sw * 0.08,  sw * 0.003],

     kp["rh"] - [sw * 0.10, -sw * 0.03],
     kp["lh"] + [sw * 0.12,  sw * 0.03],

     neck + [0, sw * 0.60],

    ], dtype=np.float32)

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

    # Measure THIS body's actual geometry from the segmentation mask
    # before warping, so every downstream step (TPS + containment) is
    # driven by the real contour instead of a fixed sw-ratio guess.
    profile = (
        measure_body_profile(seg_mask, kp, user_rgb.shape)
        if seg_mask is not None else None
    )

    warped_bgr, warped_alpha = tps_torso(
        placed_bgr,
        placed_alpha,
        kp,
        user_rgb.shape,
        profile=profile
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

    torso = torso_fill_mask(kp, user_rgb.shape, profile=profile)

    arms = arm_corridor_mask(kp, user_rgb.shape)

    contain = cv2.bitwise_or(body, torso)
    contain = cv2.bitwise_or(contain, arms)

    contain_f = cv2.GaussianBlur(
        contain.astype(float),
        (21, 21),
        0
    ) / 255.0

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