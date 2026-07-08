"""
debug_control_points.py

Draws every candidate TPS control point (existing torso anchors +
proposed elbow / wrist / rib-pin points) directly on your actual
garment image, with labels and pixel coordinates printed to the
console.

Usage:
    python debug_control_points.py path/to/garment.png

- If the image has an alpha channel (e.g. the output of remove_bg,
  or a PNG with transparency), the bounding box is computed from the
  non-transparent region — exactly like tps_torso()/tps_sleeve() do
  internally (bx, by, bw, bh).
- If the image has no alpha channel, the full image bounds are used.

Look at the saved output image (debug_control_points_output.png) and
tell me which labeled points are in the wrong place (e.g. "elbow_R
should be further left" or "wrist_R should be lower"). I'll translate
that directly into corrected fx/fy fractions — no more guessing.
"""

import sys
import cv2
import numpy as np


def get_bbox(img):
    if img.shape[2] == 4:
        alpha = img[:, :, 3]
        coords = cv2.findNonZero(alpha)
        if coords is not None:
            return cv2.boundingRect(coords)
    h, w = img.shape[:2]
    return (0, 0, w, h)


def draw_point(canvas, x, y, label, color):
    x, y = int(x), int(y)
    cv2.circle(canvas, (x, y), 8, color, -1)
    cv2.circle(canvas, (x, y), 10, (0, 0, 0), 2)
    cv2.putText(
        canvas, label, (x + 14, y + 4),
        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 3, cv2.LINE_AA
    )
    cv2.putText(
        canvas, label, (x + 14, y + 4),
        cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 1, cv2.LINE_AA
    )


def main(path):
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"Could not load image: {path}")
        return

    if img.shape[2] == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

    bx, by, bw, bh = get_bbox(img)

    canvas = img[:, :, :3].copy()
    # If background is transparent/black, lighten it a touch so
    # black-colored labels/points are still visible.
    canvas = cv2.convertScaleAbs(canvas, alpha=1.0, beta=30)

    def sp(fx, fy):
        return (bx + bw * fx, by + bh * fy)

    # Existing torso anchors (from tps_torso) — GREEN
    torso_points = {
        "neck_top":   sp(0.50, 0.04),
        "shoulder_R": sp(0.18, 0.10),
        "shoulder_L": sp(0.82, 0.10),
        "hip_R":      sp(0.22, 0.94),
        "hip_L":      sp(0.78, 0.94),
        "chest_ctr":  sp(0.50, 0.55),
    }

    # Candidate elbow points (ROUND 3 — round 2 still landed right at
    # the fabric edge; pushing further inward for margin) — ORANGE
    elbow_points = {
        "elbow_R": sp(0.12, 0.46),
        "elbow_L": sp(0.88, 0.46),
    }

    # Candidate wrist/cuff points (ROUND 4 — elbow/rib confirmed
    # correct in round 3; only wrist still landed just outside the
    # cuff, in the black background) — BLUE
    wrist_points = {
        "wrist_R": sp(0.14, 0.90),
        "wrist_L": sp(0.86, 0.90),
    }

    # Candidate rib-pin points (last attempt) — MAGENTA
    rib_points = {
        "rib_R": sp(0.20, 0.30),
        "rib_L": sp(0.80, 0.30),
    }

    for name, (x, y) in torso_points.items():
        draw_point(canvas, x, y, name, (0, 200, 0))

    for name, (x, y) in elbow_points.items():
        draw_point(canvas, x, y, name, (0, 140, 255))

    for name, (x, y) in wrist_points.items():
        draw_point(canvas, x, y, name, (255, 120, 0))

    for name, (x, y) in rib_points.items():
        draw_point(canvas, x, y, name, (200, 0, 200))

    # Draw the bounding box used for all fx/fy fractions, so it's
    # clear what "0.0 - 1.0" actually spans.
    cv2.rectangle(canvas, (bx, by), (bx + bw, by + bh), (0, 0, 255), 2)

    out_path = "debug_control_points_output.png"
    cv2.imwrite(out_path, canvas)

    print(f"Bounding box: x={bx}, y={by}, w={bw}, h={bh}\n")
    print("Legend: GREEN=existing torso anchors, ORANGE=elbow, BLUE=wrist, MAGENTA=rib-pin\n")

    all_points = {**torso_points, **elbow_points, **wrist_points, **rib_points}
    for name, (x, y) in all_points.items():
        print(f"  {name:12s} -> pixel ({x:.0f}, {y:.0f})")

    print(f"\nSaved annotated image to: {out_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python debug_control_points.py path/to/garment.png")
        sys.exit(1)
    main(sys.argv[1])