"""Vectorise MOOON's logo PNG into parts: m, o1, o2, o3, n, pilates.

Run from the repo root: `python3 scripts/trace-logo.py`. Needs numpy, pillow, opencv-python-headless and
potracer (pip). The three O's overlap in the PNG, so they are split by fitting a circle to each ring
(Kasa fit) and giving every ink pixel to the ring it lies on; a crossing belongs to both. Writes
src/lib/assets/logo-parts.ts and a colour check render in scripts/logo-check.svg (not committed).
"""
import json, os, numpy as np, cv2, potrace
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

W, H = 2350, 810
a = np.array(Image.open(os.path.join(ROOT, 'src/lib/assets/logo-black.png')).convert('RGBA'))
mask = a[..., 3] > 128
ys, xs = np.nonzero(mask)

# the ring region (the merged O component): x 533..1921, y 0..515
ring = mask.copy()
ring[:, :520] = False; ring[:, 1930:] = False; ring[560:, :] = False
ry, rx = np.nonzero(ring)
pts = np.stack([rx, ry], 1).astype(float)

def kasa(p):
    x, y = p[:, 0], p[:, 1]
    A = np.stack([x, y, np.ones_like(x)], 1)
    b = x * x + y * y
    c, *_ = np.linalg.lstsq(A, b, rcond=None)
    cx, cy = c[0] / 2, c[1] / 2
    r = np.sqrt(c[2] + cx * cx + cy * cy)
    return cx, cy, r

# initial guesses from the extents (outer radius minus half the 52px stroke)
rings = [(759.0, 260.0, 200.0), (1230.0, 258.0, 232.0), (1695.0, 261.0, 200.0)]
for it in range(8):
    d = np.stack([np.abs(np.hypot(pts[:, 0] - cx, pts[:, 1] - cy) - r) for cx, cy, r in rings], 1)
    own = d.argmin(1)
    new = []
    for i in range(3):
        sel = pts[(own == i) & (d[:, i] < 40)]
        new.append(kasa(sel))
    rings = new
print('rings', [(round(cx), round(cy), round(r, 1)) for cx, cy, r in rings])

d = np.stack([np.abs(np.hypot(pts[:, 0] - cx, pts[:, 1] - cy) - r) for cx, cy, r in rings], 1)
parts = {}
full = np.zeros_like(mask)
for i in range(3):
    m = np.zeros_like(mask)
    keep = d[:, i] <= 34  # half the stroke plus a margin: a crossing belongs to both rings
    m[pts[keep, 1].astype(int), pts[keep, 0].astype(int)] = True
    parts['o%d' % (i + 1)] = m
    full |= m
print('ring pixels covered', int(full[ring].sum()), 'of', int(ring.sum()))
# anything in the ring region no ring claimed goes to the nearest ring
rest = ring & ~full
if rest.any():
    ry2, rx2 = np.nonzero(rest)
    dd = np.stack([np.abs(np.hypot(rx2 - cx, ry2 - cy) - r) for cx, cy, r in rings], 1).argmin(1)
    for i in range(3):
        parts['o%d' % (i + 1)][ry2[dd == i], rx2[dd == i]] = True

m = mask.copy(); m[:, 500:] = False; parts['m'] = m
n = mask.copy(); n[:, :1960] = False; n[560:, :] = False; parts['n'] = n
p = mask.copy(); p[:600, :] = False; parts['pilates'] = p

def trace(bm):
    path = potrace.Bitmap(~bm).trace(turdsize=4, alphamax=1.0, opticurve=True, opttolerance=0.2)
    out = []
    for curve in path:
        sp = curve.start_point
        s = 'M%.1f %.1f' % (sp.x, sp.y)
        for seg in curve:
            e = seg.end_point
            if seg.is_corner:
                c = seg.c
                s += 'L%.1f %.1fL%.1f %.1f' % (c.x, c.y, e.x, e.y)
            else:
                c1, c2 = seg.c1, seg.c2
                s += 'C%.1f %.1f %.1f %.1f %.1f %.1f' % (c1.x, c1.y, c2.x, c2.y, e.x, e.y)
        out.append(s + 'Z')
    return ''.join(out)

order = ['m', 'o1', 'o2', 'o3', 'n', 'pilates']
result = [{'id': k, 'd': trace(parts[k])} for k in order]
for r in result:
    print(r['id'], len(r['d']))
ts = "/**\n * MOOON's logo as paths, traced from their 2350 x 810 PNG (scripts/trace-logo.py). Six parts, so the\n * moon moment and the load reveal can move them one by one: the M, the three O's, the N, PILATES.\n * Never recoloured (fill is currentColor), never cropped (the viewBox is the whole logo).\n */\nexport const logoBox = '0 0 2350 810';\n\nexport const logoParts: { id: string; d: string }[] = " + json.dumps(result, indent=1).replace('"id"', 'id').replace('"d"', 'd') + ';\n'
open(os.path.join(ROOT, 'src/lib/assets/logo-parts.ts'), 'w').write(ts)
# a check render: every part in its own colour
svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s" width="2350" height="810"><rect width="100%%" height="100%%" fill="#fff"/>' % '0 0 2350 810'
cols = ['#c00', '#06c', '#090', '#c60', '#609', '#000']
for r, c in zip(result, cols):
    svg += '<path d="%s" fill="%s" fill-rule="evenodd"/>' % (r['d'], c)
svg += '</svg>'
open(os.path.join(ROOT, 'scripts/logo-check.svg'), 'w').write(svg)
print('written')
