# Recipe — MOOON Pilates (boutique studio, calm and warm, in their own brand)

A landing page for women around Spijkenisse who are curious about reformer pilates; it must make them book the trial class, "Meet the reformer", €25.

Built with the `site-design-rulebook` skill (path: new site from the client's existing brand; the brand tokens were given, so nothing was restyled away from MOOON's own colours, fonts or logo).

| Layer | Choice | Rules |
| --- | --- | --- |
| Surface and theme | Light. Page `#F0ECE6` (their page-transition cream), panel `#E2DCD5` (their tertiary) for "your first class", one dark band in their own home gradient (`#6E7269` → `#423D31`) for the studio and the trial-class price. | C13, C22, C23 |
| Palette | One action hue: `#423D31` (solid booking button, fill `#6E7269`). Text `#5C5545`, quiet text `#6B6661`, hairlines `#C4B39C`. All from their Elementor kit. No second hue. | C01, C07, C08, C14 |
| Type | Two families, their own: Aboreto for headings, Afacad for text. Scale: 12 · 15 · 18 · 20–24 · 36 · 30–48 · 36–63 px (label, small, body, lede, price, h2, h1). Weights 400 and 500. One caps style: 12 px, 500, +0.12em. | T01, T02, T07, T10, T35 |
| Spacing and grid | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 px, plus the section rhythm. One frame (1280 px, gutter 20–72 px); splits on 7/5 or 5/7. | T56, T66, T68, A03 |
| Radius and depth | Two radii: pill (buttons) and the circle (the moon). Photos square-edged. One edge technique: 1 px hairlines, no shadows. | A12, C25, C26, C32 |
| Nav | Four links, language switch, one outline booking button; 72 px. The small logo appears only once the hero's large logo has scrolled away. | A39, A40 |
| Hero | Split: the logo large, H1 "Move slowly, feel deeply", one line, the solid booking button, address and "open today until". Right half a full-height photo to the edge. | A41, C18, C77 |
| Section headers | H2 in Aboreto, lede under it 24 px, 48 px to content. Labels above a heading only once ("Meer dan een studio"). | A45, T21 |
| Cards and grids | Offer: five equal columns (photo 3:4, title, one line, "read more"); phone: rows with a small photo. | A47, A48, C81 |
| Pricing | The trial class on its own dark panel with the only button; the rest as a ruled list. Period at 18/36 = 0.5× the price. | A51, A54, T43 |
| Proof | No reviews (none exist on their site). One quote, their own, set in Aboreto, opening mark hung. No logo strip, no stats. | A31, T47, A69, A83 |
| FAQ | Two groups, hairline rows, a drawn plus that loses its upright when open; no movement. | A59 |
| Footer | The logo across the full content width (A06), then tagline, address, links, legal and credit. | A60, A06 |
| Imagery | Their own warm, beige-graded photos: DASHENKO shoot (portrait 2:3) for people and atmosphere, their own phone photos for the machines. One ratio per set: 3:4 for the offer, 2:3 for the studio row, 4:5 for the split sections. No overlays on photos with text. | I05, I11, I16, I22 |
| Container breaks | Hero photo bleeds to the right edge (desktop) and full width (phone); the dark studio band is full width; the front of the studio bleeds full width before the footer. One per viewport. | A29, B01, B02, A16, T69 |
| Motion | Class B, calm. Three kinds: 11b on every heading, 01b as the one signature (the moon rising on the reformer room), 27c on the booking buttons. Nothing crosses the frame. | bewegingsconcept, M01, M23 |

## Deviations

- **A81 (middle dots)**: one in the footer credit, "Conceptdemo · JW Creative", because that is the agreed credit line for every JW Creative demo.
- **A06/A07 (oversized wordmark clipped from the bottom)**: the footer logo is shown whole. It is MOOON's logo, not a wordmark set in a font, and is never cropped.
- **01b**: the library's circle keeps its centre on the bottom edge, so its top half is always clipped. Here the circle rises while it grows and is whole at every frame (see the README).

## AI-tell check

- No cream-serif-terracotta default: every colour and both fonts are MOOON's own, measured from their kit.
- Not everything centred: the page hangs from one left edge; only the moon is centred, because it is a moon.
- No tracked label above every heading; one, where it names the section ("More than a studio").
- No decorative stars, no arrows typed into copy (arrow icons on links only), no "scroll" chrome.

## Guardrails (motion)

- [x] At most three kinds of movement.
- [x] One signature moment.
- [x] Text readable within 300 ms (expo-out: about 80 % of the way at 300 ms).
- [x] No scroll lock (the dialog holds the page only while it is open).
- [x] Complete under `prefers-reduced-motion` (checked: nothing hidden, the moon open).
