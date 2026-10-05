"""Vectorise MOOON's logo PNG into parts: m, o1, o2, o3, n, pilates.

Run from the repo root: `python3 scripts/trace-logo.py`. Needs numpy, pillow and potracer (pip).

The three O's are crescents: each is a circle with a smaller circle cut out of it, off centre, so the
ring is thick on one side and thin on the other, and the outer two are open where the thin side would
be. They overlap in the PNG, so the script fits that pair of circles to each ring (a least-squares
start, then a pixel-mismatch refinement), gives every ink pixel to the ring whose model contains it
(a crossing belongs to both) and traces each ring from its own pixels. The circles go to
logo-parts.ts too: the load reveal waxes each O like a moon with a shadow circle that moves from the
ring's centre to the cut-out's place. Writes src/lib/assets/logo-parts.ts and a colour check render in
scripts/logo-check.svg (not committed).
"""
import json, os, numpy as np, potrace
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
a = np.array(Image.open(os.path.join(ROOT, 'src/lib/assets/logo-black.png')).convert('RGBA'))
ink = a[..., 3] > 128
H, W = ink.shape
yy, xx = np.mgrid[0:H, 0:W]
xx = xx + 0.5
yy = yy + 0.5

# the ring region (the merged O component): x 533..1921, y 0..515
ring = ink.copy()
ring[:, :520] = False; ring[:, 1930:] = False; ring[560:, :] = False
ry, rx = np.nonzero(ring)
pts = np.stack([rx, ry], 1).astype(float) + 0.5


def kasa(p):
    x, y = p[:, 0], p[:, 1]
    A = np.stack([x, y, np.ones_like(x)], 1)
    b = x * x + y * y
    c, *_ = np.linalg.lstsq(A, b, rcond=None)
    cx, cy = c[0] / 2, c[1] / 2
    return cx, cy, np.sqrt(c[2] + cx * cx + cy * cy)


# 1. one circle per ring through the middle of the stroke, to split the pixels roughly
mid = [(759.0, 260.0, 200.0), (1230.0, 258.0, 232.0), (1695.0, 261.0, 200.0)]
for it in range(8):
    d = np.stack([np.abs(np.hypot(pts[:, 0] - cx, pts[:, 1] - cy) - r) for cx, cy, r in mid], 1)
    own = d.argmin(1)
    mid = [kasa(pts[(own == i) & (d[:, i] < 40)]) for i in range(3)]
d = np.stack([np.abs(np.hypot(pts[:, 0] - cx, pts[:, 1] - cy) - r) for cx, cy, r in mid], 1)
own = d.argmin(1)

# 2. outer and inner circle per ring from the boundary pixels, away from the crossings
pairs = []
for i, (cx, cy, r) in enumerate(mid):
    p = pts[own == i]
    ang = np.degrees(np.arctan2(p[:, 1] - cy, p[:, 0] - cx))
    rad = np.hypot(p[:, 0] - cx, p[:, 1] - cy)
    bins = np.round(ang).astype(int)
    others = [mid[j] for j in range(3) if j != i]
    outer, inner = [], []
    for b in np.unique(bins):
        sel, rr = p[bins == b], rad[bins == b]
        po, pi = sel[rr.argmax()], sel[rr.argmin()]
        clear = all(abs(np.hypot(q[0] - ox, q[1] - oy) - orr) > 40 for q in (po, pi) for ox, oy, orr in others)
        if clear and rr.max() - rr.min() > 3:
            outer.append(po); inner.append(pi)
    pairs.append(list(kasa(np.array(outer))) + list(kasa(np.array(inner))))


def crescent(p):
    return (np.hypot(xx - p[0], yy - p[1]) <= p[2]) & ~(np.hypot(xx - p[3], yy - p[4]) < p[5])


# 3. refine each pair on the pixels, outside the crossings
for k in range(3):
    o = pairs[k]
    reg = np.hypot(xx - o[0], yy - o[1]) <= o[2] + 15
    for j in range(3):
        if j != k:
            reg &= np.abs(np.hypot(xx - mid[j][0], yy - mid[j][1]) - mid[j][2]) > 44
    reg &= ring | ~ink
    reg &= (xx > 520) & (xx < 1930) & (yy < 560)
    target = ink & reg
    err = lambda p: int(((crescent(p) & reg) ^ target).sum())
    p = np.array(o, float)
    best = err(p)
    for step in (2, 1, 0.5, 0.25):
        improved = True
        while improved:
            improved = False
            for dim in range(6):
                for s in (step, -step):
                    q = p.copy(); q[dim] += s; e = err(q)
                    if e < best:
                        best, p, improved = e, q, True
    pairs[k] = p
    print('ring %d: outer (%.1f, %.1f) R %.1f, inner (%.1f, %.1f) r %.1f, mismatch %d px' % (k, *p, best))

# 4. every ink pixel in the ring region goes to each ring whose model holds it (a margin of 2 px);
#    what no model holds (the open tips' ends, the odd pixel) goes to the nearest middle circle
parts = {}
claimed = np.zeros_like(ink)
for k, p in enumerate(pairs):
    m = ring & (np.hypot(xx - p[0], yy - p[1]) <= p[2] + 2) & ~(np.hypot(xx - p[3], yy - p[4]) < p[5] - 2)
    parts['o%d' % (k + 1)] = m
    claimed |= m
rest = ring & ~claimed
if rest.any():
    r2y, r2x = np.nonzero(rest)
    near = np.stack([np.abs(np.hypot(r2x + 0.5 - cx, r2y + 0.5 - cy) - r) for cx, cy, r in mid], 1).argmin(1)
    for k in range(3):
        parts['o%d' % (k + 1)][r2y[near == k], r2x[near == k]] = True
    print('unclaimed ring pixels given to the nearest ring:', int(rest.sum()))

m = ink.copy(); m[:, 500:] = False; parts['m'] = m
n = ink.copy(); n[:, :1960] = False; n[560:, :] = False; parts['n'] = n
p = ink.copy(); p[:600, :] = False; parts['pilates'] = p


def trace(bm):
    # potracer takes 0 as ink, so the bitmap is inverted
    path = potrace.Bitmap(~bm).trace(turdsize=4, alphamax=1.0, opticurve=True, opttolerance=0.2)
    out = []
    for curve in path:
        s = 'M%.1f %.1f' % (curve.start_point.x, curve.start_point.y)
        for seg in curve:
            e = seg.end_point
            if seg.is_corner:
                s += 'L%.1f %.1fL%.1f %.1f' % (seg.c.x, seg.c.y, e.x, e.y)
            else:
                s += 'C%.1f %.1f %.1f %.1f %.1f %.1f' % (seg.c1.x, seg.c1.y, seg.c2.x, seg.c2.y, e.x, e.y)
        out.append(s + 'Z')
    return ''.join(out)


order = ['m', 'o1', 'o2', 'o3', 'n', 'pilates']
result = [{'id': k, 'd': trace(parts[k])} for k in order]
for r in result:
    print(r['id'], len(r['d']))
rings = [
    {'id': 'o%d' % (k + 1), 'cx': round(p[0], 1), 'cy': round(p[1], 1), 'R': round(p[2], 1),
     'ix': round(p[3], 1), 'iy': round(p[4], 1), 'r': round(p[5], 1)}
    for k, p in enumerate(pairs)
]


def ts_obj(o):
    return '{ ' + ', '.join('%s: %s' % (k, json.dumps(v)) for k, v in o.items()) + ' }'


ts = """/**
 * MOOON's logo as paths, traced from their 2350 x 810 PNG by scripts/trace-logo.py. Six parts, so the
 * load reveal can move them one by one: the M, the three O's, the N, PILATES. Never recoloured (fill is
 * currentColor), never cropped (the viewBox is the whole logo).
 */
export const logoBox = '0 0 2350 810';

export type LogoPart = { id: string; d: string };
/** The circles each O is drawn from: the outer circle (cx, cy, R) with the inner one (ix, iy, r) cut out. */
export type LogoRing = { id: string; cx: number; cy: number; R: number; ix: number; iy: number; r: number };

export const logoParts: LogoPart[] = [
%s
];

export const logoRings: LogoRing[] = [
%s
];
""" % (',\n'.join('\t' + ts_obj(r) for r in result), ',\n'.join('\t' + ts_obj(r) for r in rings))
open(os.path.join(ROOT, 'src/lib/assets/logo-parts.ts'), 'w').write(ts)

# a check render: every part in its own colour, the fitted circles as thin lines
svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2350 810" width="2350" height="810"><rect width="100%%" height="100%%" fill="#fff"/>'
cols = ['#c00', '#06c', '#090', '#c60', '#609', '#000']
for r, c in zip(result, cols):
    svg += '<path d="%s" fill="%s" fill-rule="evenodd" fill-opacity="0.8"/>' % (r['d'], c)
for q in rings:
    svg += '<circle cx="%s" cy="%s" r="%s" fill="none" stroke="#f0f" stroke-width="1.5"/><circle cx="%s" cy="%s" r="%s" fill="none" stroke="#0ff" stroke-width="1.5"/>' % (q['cx'], q['cy'], q['R'], q['ix'], q['iy'], q['r'])
svg += '</svg>'
open(os.path.join(ROOT, 'scripts/logo-check.svg'), 'w').write(svg)
print('written')
