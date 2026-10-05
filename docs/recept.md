# Recipe — MOOON Pilates (physiotherapy, gym or yoga studio; look: Dark luxury club)

A landing page for women around Spijkenisse who are curious about reformer pilates; it must make them book the trial class, "Meet the reformer", €25.

Third build, 5 October 2026, on the restyle path of the `site-design-rulebook` skill (978 rules, `looks.md` with 35 sectors). Intake: the second build's style was extracted first (`docs/audit.md`); Jaymar chose restyle. The sector is "physiotherapy, gym or yoga studio" (SB); its production default, **Dark luxury club**, names "premium gyms, reformer pilates and spa-gyms" and is measured on one site (Third Space), so MOOON's own material decided more than usual. Content and structure (`docs/structuur.md`) are unchanged; the moon, the one margin, the three kinds of movement and the booking dialog are Jaymar's own prescriptions from `HANDOFF.md` and stay.

| Layer | Choice | Rules |
| --- | --- | --- |
| Look | Dark luxury club (SB, 1 of 1 measured). Departures, each declared below: MOOON's night instead of near-black, their cream for the light band and the moon, radius 8 on buttons instead of pills, prices on the page, a label on every section header, motion class B. | looks.md, SB01, SB06, SB10, SB15, SB19 |
| Surface and theme | Single dark-first: the ground is their night `#423D31` (the dark end of their home gradient); one light band in their cream `#F0ECE6` for the first class and the prices, opened by the moon; the closing card and the footer stay on the night. | C13, C22, C23, SB15 |
| Palette | No chromatic accent (the look's "none"): a cream filled button on the night, a night filled button on the cream band; the hover fill is their olive `#6E7269`. Text cream, quiet text their tertiary `#E2DCD5`; on the band their text colours `#5C5545` / `#6B6661`. Hairlines: cream at 14 % on the night (about 1.3:1), their sand `#C4B39C` on the band. All from their Elementor kit. | C01, C07, C08, C14 |
| Type | Two families, their own: Aboreto for headings and statements, Afacad for text, labels and buttons. Scale: 13 · 15 · 18 · 20–24 · 36 · 30–48 · 36–64 (label, small, body, lede, price, h2, h1), plus 16 for the FAQ question. Weights 400 and 500. One caps style: 13 px, 500, +0.10em, for labels, nav links and buttons. | T01, T02, T07, T10, T35, SB06, OA07 |
| Spacing and grid | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72. Wide frame: 1350 at 1440 with 45 px gutters (the sector's class), 24 px on a phone. **One margin** (`--margin`) on the nav, the hero, every band and the footer: the key line is x = 45 at 1440. Section padding 48 per side (96 between sections, the sector's median 93); one sparse step of 96 per side for the statement and the closing card. | T56, T66, T68, A03, GD01, GF12, GC31, OA03, GC11 |
| Centring budget and mode sequence | **Book-ends + 1** (the look's budget): hero, statement, closing card. Map: hero C (full-bleed photo, centred stack, metadata in the corners), statement C, about A 5/7, offer G (left heading, carousel bleeding right), moon F, first class G, prices A 5/7, founders A 7/5, studio G (carousel), more A 5/7, FAQ A 5/7, visit G, closing C. Key-line side 9 of 12, centred 3: 75 %. No two text-only centred stacks touch (the hero carries the photo). | GA29, GD03, GD29, GF01, GA16 |
| Asymmetry and under-fill | One split, 5/7, and its mirror 7/5 (founders); the FAQ uses the same split (heading in the left 5, list from 41.7 %). The offset ruler is the 7-column line at x = 650. Under the container: the statement (720 px), the closing stack (608 px), the FAQ list, the head blocks (46 rem). | GB01, GB05, GB18, GC01, GC08, GC11, GF10 |
| Radius and depth | One radius, 8, on photos, tiles, buttons and the price block. One edge technique: 1 px hairlines. No shadows. | A12, C25, C26, C32 |
| Nav | Two-zone bar, 5 destinations: logo 26 px on the left margin, four links at 13 px caps with 32 px gaps, the language link, one cream filled button of 36 px (one step below the hero's 48). Transparent over the hero, then the night surface and one hairline, faded in over 200 ms, once. Mobile: 56 px bar with logo and "Menu"; a full sheet with 56 px hairline rows and the filled button below them. | NA01, A39, A40, NC01, NB02, NC08, NC09, NC11, NB19, NB15, NA21, NC26, NB24, NB25, SB01 |
| Hero | One screen (SB19: full viewport for premium clubs), the reformer room edge to edge under a 50 % night overlay; on the axis the logo, the tagline in Aboreto and the one button; address and today's hours in the two bottom corners on the margin. | A41, A43, C18, GA19, GA14, GF06, I22 |
| Section headers | Label (13 px caps, the sector's convention), heading, lede; 12 / 24 / 48. All on the key line except the three centred sections. | A45, T21, OA13 |
| Cards and grids | The sector's tile: 3:4 photo, radius 8, words bottom-left on an eased scrim. Offer: five tiles in a row from the margin off the right edge, the last cut to about 40 %. Studio: four larger tiles, the last cut to about 46 %. | A47, A48, C81, B16, B31, SB10 |
| Pricing | The trial class highlighted with one device, a night block on the cream band, with the one button; the rest as hairline rows; period at 18/36 = 0.5. | A51, T43 |
| Proof | No reviews (none exist on their site). One quote, their own, in Aboreto with the opening mark hung. No stats, no logos. | A31, T47, A69, A83 |
| FAQ | Kept on the homepage (their six questions, `FAQPage` JSON-LD). Split pattern, two titled groups; rows 73 px pitch (dark band 72–104), question 16/500, answer 15 one tone lighter at 38 em, plus on the right in the question's tone, all closed. | A59, FA04, FB01, FB03, FB12, FC04, FC26, FA14 |
| Footer | Night, the logo margin to margin, the tagline and one row of small-caps links, the legal row with the credit. | A60, A06 |
| Imagery | Their own photos only: the DASHENKO shoot and their studio photos. Ratios: 16:9 (hero ground), 5:4 (the three splits), 3:4 (the two carousels), the front door under the closing stack. Overlays: 50 % night on the hero, 55 % on the closing card, an eased scrim on the tiles. | I05, I11, I16, I22, I23, I26 |
| Container breaks | Hero edge to edge (the first); the offer carousel off the right edge; the moon and the cream band edge to edge; the studio carousel off the right edge; the closing card inset in the frame; the footer logo margin to margin. One per viewport; copy always on the margin. | A29, B01, B02, B04, B05, B06, A16, T69, B15 |
| Motion | Class B, expressive family, the three kinds Jaymar prescribed: 16 (headings as the library has it; the same curve at 0.7 s for every other rise and the photo wipes), 01b as the signature (the moon, scrub, no pin), 27c plus the fill on every button and tile. Nothing crosses the frame. See below. | M01, M23, animation-map.md (hero image-led: 01b; text: 16; buttons: 27c) |

## Motion

1. **Reveal on enter, one family.** Library 16 for the display headings as the library has it: every word in two nested masks, the line rises 50 % and the word 120 %, 1.4 s and 1.7 s, `cubic-bezier(.83,.01,.29,1)`, lines 0.10 / 0.20 / 0.25 s apart, once. Everything else that enters the screen moves the same way on the same curve, 0.7 s (the top of the expressive family): text, tiles, steps, prices and FAQ rows rise out of a mask from below their line; photos open with a wipe from the bottom. The hero logo arrives from the inside out on 16's 1.4 s: the three O's are crescents and wax like moons (a shadow circle in each one's mask moves from the ring's centre to the cut-out's place, thick side first), the middle one at 0, the outer two at 0.3 s; the M and the N rise out of the wipe at 0.7 s, PILATES at 1.0 s. One stagger rule: whatever enters in the same frame follows at 100 ms, six at most. What is on the first screen plays at load. The FAQ answer slides open and closed (250 / 200 ms).
2. **Signature, once.** 01b as the library has it: a circle in their cream opens from the bottom edge of the screen, so only its top half is seen, a dome that grows with the scroll until it fills the screen, no ease, no pin, no scroll lock; the cream band continues on its colour. Stage 100 svh; the moon itself two screens tall and over the section before it, so the dome rises over the offer tiles and is never cut flat (end 120 % of that box, the library's pace).
3. **Hover, one language.** Buttons and tiles fill from the bottom and empty through the top (0.38 s, 16's curve); the button's fill carries its own copy of the label, the tile's fill is a half-transparent night. Every button also takes 27c: 30 % toward the cursor, 200 ms expo-out, with a real cursor only. Text links roll: the label slides up out of its line while a copy comes in from below, 0.38 s on the same curve. A rise mask releases its overflow once the rise is done, so the magnet is never clipped.

Guardrails: three kinds, one signature, no scroll lock, complete under `prefers-reduced-motion` (nothing hidden, the moon stage a 40 svh cream block), Lighthouse not measured. The 300 ms guardrail holds for the rises (text is up at about 0.5 s) and not for the display headings, which run 16's own 1.4 s because that is what was asked.

## Deviations

- **Theme (look)**: their night `#423D31` instead of near-black, and their cream instead of light grey, so the page is MOOON's palette and not Third Space's. SB15 allows the dark page for premium clubs.
- **Radius (look: buttons pill, tiles 8)**: buttons at 8 like the tiles. A pill with the prescribed fill and magnet repeats the Fuku button that got the first build rejected.
- **Prices (look: "avoid price tables on the homepage")**: the agreed structure keeps the prices; they are hairline rows with one highlighted block, not a table. MOOON still has to confirm them.
- **Display (look: italic serif word)**: Aboreto has no italic; no emphasis device.
- **Labels above headings**: on every section, the wellness convention (OA13), where SaaS would read it as a tell (A84).
- **Scroll chevron (look)**: dropped; A81 chrome. **Round arrow on tiles (look)**: dropped; A84.
- **Nav links**: 13 px tracked caps (OA07 allows 11–13 on gym sites) instead of 15–18 sentence case.
- **Mobile sheet links**: 18 px (the body step) instead of 15–16; the scale has no 16.
- **Motion class B (look: A)** and 01b as a takeover: Jaymar's prescription.
- **16 timings on the non-heading reveals**: 0.7 s instead of 1.4 s, for readability. GB02's visual-to-copy ratio is 1.4 (5/7) instead of 1.5, because the FAQ fixes the page's one split at 5/7.
- **A81 (middle dot)**: one, in the footer credit "Conceptdemo · JW Creative", the agreed credit line.
- **A06/A07**: the footer logo is shown whole, margin to margin; it is their logo, never clipped.
- **Logo as SVG**: six parts traced from their PNG (`scripts/trace-logo.py`), the O's split by the circles they are drawn from; not Jaymar's own drawing yet; his paths can replace them under the same ids.
- **01b's box**: the moon is two screens tall instead of the library's one, so it can lie over the section before it; the end value is 120 % instead of 150 % so it rises and covers at the library's moments.
- **Mobile scrollers**: the audit script reports the carousel tiles past the viewport edge as a fault; they scroll inside their row, the page does not (document width 400).

## AI-tell check (A76 to A88, GA30)

- No cream-serif-terracotta default: every colour and both fonts are measured from MOOON's kit; the page is dark-first.
- A declared centring budget (book-ends + 1), no centred paragraph over 4 lines (the closing line is 2), every centred element on the axis within 2 px (measured 0).
- One radius, no shadows, no glass, no blobs, no stars, no arrows, no "scroll" chrome. Labels on headings are the sector's convention.
- No generic pattern twice in a row: the two carousels are separated by the band, the founders and the visit section.
- Nothing from Fuku Ramen: square-cornered-at-8 small-caps buttons, a transparent-then-night bar, one language link, a cream bar for the dialog, a night footer with a link row.

## For Jaymar to flip if he wants (each is one token or one rule)

1. Dark-first page (the look) → light page: swap `--night` and `--paper` roles; the moon would turn night again.
2. Centring budget book-ends + 1 → book-ends: put the statement and the closing stack on the key line.
3. Button radius 8 → pill (the look's default).
4. Bar transparent over the hero → always solid.
5. Section labels → none.
6. Prices on the page → on their own page (the look's advice).
