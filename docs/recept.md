# Recipe — MOOON Pilates (boutique studio, calm and warm, in their own brand)

A landing page for women around Spijkenisse who are curious about reformer pilates; it must make them book the trial class, "Meet the reformer", €25.

Second build (2 October 2026), after the first was rejected (see `HANDOFF.md`). Built with the `site-design-rulebook` skill on the restyle path: the brand (colours, fonts, logo, photos) is MOOON's own and was kept; every visible part (nav, hero, button, language switch, cards, dialog, footer, the motion) was designed again from the rulebook, nothing copied from another JW Creative site.

| Layer | Choice | Rules |
| --- | --- | --- |
| Surface and theme | Light. Page `#F0ECE6` (their page-transition cream), panel `#E2DCD5` (their tertiary) for "your first class", and one dark band in `#423D31` (the dark end of their home gradient) that the moon opens: the studio and the founders sit on it. The footer is the same dark. | C13, C22, C23 |
| Palette | One action hue: `#423D31` (the filled button, the moon, the dark band), its hover fill `#6E7269` (their primary). Text `#5C5545`, quiet text `#6B6661`, hairlines `#C4B39C`. All from their Elementor kit. No second hue. | C01, C07, C08, C14 |
| Type | Two families, their own: Aboreto for headings, Afacad for text. Scale: 12 · 15 · 18 · 20–24 · 36 · 30–48 · 36–64 px (label, small, body, lede, price, h2, h1). Weights 400 and 500. One caps style: 12 px, 500, +0.12em, used for column labels only. | T01, T02, T07, T10, T35 |
| Spacing and grid | 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 px, plus the section rhythm (88–160 px). **One margin**: `max(gutter, (100% − 1280px) / 2)` on the nav, the hero, every band and the footer, so one left edge and one right edge run down the page. Splits on 7/5 or 5/7. | T56, T66, T68, A03, A40 |
| Radius and depth | One radius: 0. The only curve is the moon. One edge technique: 1 px hairlines; bands separate by fill, never by a rule as well. No shadows. | A12, C25, C26, A34 |
| Nav | Part of the first screen, then it stays; nothing in it changes with the scroll. Logo on the left margin, four links beside it, the language link and the one filled button ending on the right margin. 72 px. On a phone: logo, language, "Menu"; the links drop down under the bar on the same margin. | A39, A40, C76 |
| Hero | Exactly one screen under the bar. The reformer room as the ground, edge to edge; the logo central in the middle (the one centred thing on the page: MOOON's own asset, as Jaymar asked); on the margin at the bottom the H1 "Move slowly, feel deeply" and the booking button left, address and today's hours right. Overlay: 50 % of their night over the whole photo for the logo, an eased scrim rising behind the copy. | A41, A43, C18, I22, I23, I26 |
| Section headers | H2 in Aboreto, lede under it 24 px, 48 px to content. Labels above a heading only once ("Meer dan een studio"). All left-aligned. | A45, A46, T21 |
| Cards and grids | Offer: five cards in one row that starts on the left margin and runs off the right edge (last card 25–60 % visible), scrolling sideways; each card photo 3:4, title, one line, "Lees meer". Everything else is hairline rows, not cards. | A47, A48, C81, B01, B16 |
| Pricing | The trial class on its own dark block with the only button; the rest as hairline rows. Period at 18/36 = 0.5× the price. | A51, A54, T43 |
| Proof | No reviews (none exist on their site). One quote, their own, in Aboreto, opening mark hung. No logo strip, no stats. | A31, T47, A69, A83 |
| FAQ | Title left, rows right (kept from the first build: Jaymar liked it and the vault has no newer FAQ material). Hairline rows, the whole question clickable, a drawn plus on the right that loses its upright when open. | A59 |
| Footer | Dark band. The white logo margin to margin, then the tagline and three labelled columns (contact, follow, more), then the legal row and the credit. | A60, A06 |
| Imagery | Their own photos: the DASHENKO shoot (portrait 2:3) for people, their own studio photos for the room and the machines. Ratios: 16:9 (hero ground, the front door), 4:5 (split sections), 3:4 (offer), 2:3 (studio row). No text on a photo except in the hero. | I05, I11, I16, I22 |
| Container breaks | Hero ground edge to edge (the first); the offer row off the right edge; the moon and its band edge to edge; the front door edge to edge before the footer (the bookend). Copy always on the margin. One per viewport. | A29, B01, B02, B04, B06, A16, T69, B15 |
| Motion | Class B, calm, three kinds, see below. | M01, M23 |

## Motion

Chosen by the handoff and from the library, not asked: `16`, `01b`, `27c`. Timings are the library's where the library gives them.

1. **Reveal on enter, one family.** Library 16 for the display headings as the library has it: every word in two nested masks, the line rises 50 % and the word 120 %, 1.4 s and 1.7 s, `cubic-bezier(.83,.01,.29,1)`, lines 0.10 / 0.20 / 0.25 s apart, once. Everything else that enters the screen moves the same way on the same curve: text, cards, steps, prices and FAQ rows rise out of a mask from below their line; photos open with a wipe from the bottom. Their duration is 0.7 s, the top of the expressive family (M01), not 16's 1.4 s: at 1.4 s body copy would not be readable in time. One stagger rule for the page: whatever enters in the same frame follows at 100 ms, 16's own step, six at most.
2. **Signature, once.** 01b as a full takeover: a circle in `#423D31` grows with the scroll, no ease, no pin, no scroll lock, until it fills the screen; the studio and the founders continue on that colour. The library's circle sits on the bottom edge and is always half cut; here it is whole at every frame: while the stage scrolls in, the circle sits in the middle of the part on screen with its bottom on the bottom edge (a full moon rising), and once the stage reaches the top it grows on from the middle to the corners. The stage is 160 svh: one screen of rise, 60 svh of fill. Built so the O of the logo can take the circle's place once the logo is SVG.
3. **Hover, one language.** Buttons and the offer cards fill from the bottom and empty through the top (0.38 s, 16's curve); the button's fill carries its own copy of the label. Every button also takes 27c: it leans 30 % toward the cursor, 200 ms expo-out, only with a real cursor. Text links change colour only, 150 ms.

Guardrails: three kinds, one signature, no scroll lock, complete under `prefers-reduced-motion` (nothing hidden, the moon stage a 40 svh dark block), Lighthouse not measured. The 300 ms readability guardrail holds for the rises (text is up at about 0.5 s) and not for the display headings, which run 16's own 1.4 s because that is what was asked.

## Deviations

- **A77 / centred**: the hero logo is centred, by Jaymar's instruction; the moon is centred because it is a moon. Nothing else is.
- **A81 (middle dots)**: one in the footer credit, "Conceptdemo · JW Creative", the agreed credit line for every JW Creative demo.
- **A06/A07 (oversized wordmark clipped)**: the footer logo is shown whole, margin to margin. It is MOOON's logo and is never cropped.
- **01b**: whole at every frame instead of half cut; a full takeover instead of a photo. See Motion.
- **16 timings for the non-heading reveals**: 0.7 s instead of 1.4 s, for readability. See Motion.
- **Section order**: founders after the studio instead of before it, so both sit on the moon's colour as the handoff asked.

## AI-tell check

- No cream-serif-terracotta default: every colour and both fonts are MOOON's own, measured from their kit.
- Not everything centred: the page hangs from one margin; see the deviations for the two exceptions.
- No tracked label above every heading; one, where it names the section. No arrows in copy or on links. No "scroll" chrome, no stars.
- Nothing from Fuku Ramen: the button is a square block in sentence case, the nav does not move, the language switch is one link, the dialog is a bar on the margin, the footer is a dark band.

## Measured

Rendered with Playwright on 2 October 2026 at 1440×900 and 390×844 (`docs/screenshots/`): no horizontal overflow at either width, no console errors, the circle whole in every frame of the rise, the page complete under reduced motion. Feel in a real browser is Jaymar's call.
