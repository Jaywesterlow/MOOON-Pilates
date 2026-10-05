# Audit — MOOON Pilates, 5 October 2026, pass 4 (final)

Rendered with the rulebook's scripts (`render-audit.js`, `type-audit.js`, `extract-style.js`, `bands.py`) at 1440 and 400, 2x, real fonts confirmed (Aboreto, Afacad). Playwright end states only; feel in a real browser is Jaymar's.

## Intake (the second build, before the restyle)

Measured with `extract-style.js` on 5 October, before anything changed. Jaymar's answer to continue-or-restyle: **restyle**.

| Layer | What existed | Rulebook reading |
| --- | --- | --- |
| Families and weights | Aboreto 400, Afacad 400/500 | T07, T10: within limits |
| Type sizes in use | 12 · 15 · 18 · 24 · 36 · 48 · 63 (7) | T01: one scale |
| Colours | Cream page, panel band, night and olive for buttons and the moon, sand hairlines | C01: one action hue (night) |
| Radii | none (0 everywhere) | A12: one value |
| Spacing | 15 fixed values; 24, 16, 12, 32, 4, 72, 48, 8 on top | T56: on the scale, with em-mask noise |
| Edge and depth | 1 px hairlines, no shadows | C25, C26: one technique |
| Container | 1280 frame, 80 px margins at 1440, text left edge 80 | T68: framed class; the sector's class is wide-framed (GF12, OA05) |
| Buttons | two filled tiers, 48 px, radius 0, sentence case | C77 |
| Breaks and motion | hero bleed, offer row off the right edge, moon band, front door bleed; 16 / 01b / 27c | A29; class B |

Crucial rules the second build broke: none at system level. Against the sector: a light page where the look is dark-first (SB15 allows dark for premium clubs); a 1280 frame where gyms run 1300 to 1370 (OA05); section padding of 88 to 160 per side where the sector's gap is 64 to 120 in total (OA03); no centring budget declared (GA29); a solid bar from the first pixel where the sector's bar is transparent over the hero (NB15).

## System (measured, pass 4)

| Measure | Before (build 2) | After (build 3) | Rule |
| --- | --- | --- | --- |
| Distinct type sizes | 7 | 8: 13 · 15 · 16 · 18 · 24 · 36 · 48 · 63 (16 is the FAQ question, inside the 12–16 band) | T01 |
| Families and weights | Aboreto 400, Afacad 400/500 | the same | T07, T10 |
| Distinct spacing values (fixed) | 15 | 19; the ten most frequent cover 87 %, 64 % of them on the 4-base; the rest is the em padding of the reveal masks | T56 |
| Radii | 0 | one: 8 | A12 |
| Edge techniques in use | hairlines | hairlines (cream 14 % on the night, sand on the band); no shadows | C25, C26 |
| Caps tracking range | 0.12em | 0.10em, one style | T35 |
| Price : period | 0.5 | 0.5 (18/36) | T43 |
| Middle dots / arrows / em dashes / straight quotes / stars | 1 / 0 / 0 / 0 / 0 | 1 / 0 / 0 / 0 / 0 (the credit line) | A81, A84, A56 |
| Horizontal overflow at 400 | none | none (document 400); the carousel tiles pass the edge inside their own scroller | T67 |
| Text hidden under reduced motion | none | none | motion guardrail |
| Nav | 72 px, 15 px links, 32 gap, logo 28, button 48 | 72 px, 13 px caps links, 32 gap, logo 26, button 36 against the hero's 48 | NC01, NC06, NC08, NC09, NB19 |
| FAQ | pitch 73, question 18, answer 15 | pitch 73 on every closed row, question 16/500, answer 15, plus right, 0 open on load | FB31, FB03, FC04, FA14 |
| Balance modes | not measured | F(C) C A G F G A A G A A G C, footer L; centred 3, key-line side 9 of 12; every centred element at axis offset 0 | GD03, GF01, GA04 |

## Faults found and fixed

| Region | Fault | Rule | Fix |
| --- | --- | --- | --- |
| Every section header | The label's bottom was cut by its own reveal mask (negative margin on the label instead of on the mask) | T21 | The negative margin moved to the head's first child, the mask |
| Hero, phone | "Vandaag open tot …" in the bottom corner never rose: its trigger sat below the 94 % line | motion guardrail | Elements on the first screen at load play at once; the scroll trigger is for the rest, at 90 % |
| Bar over the hero | The hero's corner lines passed under the still-transparent bar for the last 72 px | NB15, A08 | The bar takes its surface three bar heights before the hero ends |
| Nav button | 39 px (padding plus border) where the recipe says 36 | NB19 | Padding 8 on the small size |
| FAQ | Question measured at 18 (inherited by the summary), icon not detected | FB03, FB12 | Size and weight on the summary; the plus element named `plus` |
| Page root | The audit scripts could not segment the page (SvelteKit's `display: contents` wrapper) | audit method | `%sveltekit.body%` directly in `<body>` |

## Verified after the fixes

| Check | Value |
| --- | --- |
| Row baselines (T49) | Price rows: name 18 px and amount 36 px on one baseline grid; the 26 px spread the script reports is the two sizes' descent, not a fault. Nav: links and button are different elements on one centre line. |
| Button label centring | 1 px top, 1 px bottom on all five buttons |
| Container breaks | Hero edge to edge; offer row off the right edge (last tile 41 % visible); moon and cream band edge to edge; studio row off the right edge (46 %); closing card inset; footer logo margin to margin. One per viewport. |
| Centred elements | Hero stack, statement, closing stack: axis offset 0 at 1440 |
| Bands read | 12 desktop bands (900 px) and 10 mobile strips (1200 px) plus a viewport shot per section at 1440 and 390, nothing new on the last pass |
| Reduced motion | Full page complete; the moon stage a 40 svh cream block |
| Console | No errors at 1440 or 390, NL and EN |

## Stays by intent

See the deviations in `docs/recept.md`: the night instead of near-black, radius 8 instead of pills, prices on the page, labels on headings, 13 px caps nav links, 18 px sheet links, motion class B with 01b as the signature, 0.7 s on the non-heading reveals, the one middle dot in the credit, the footer logo whole, the carousel tiles past the viewport edge inside their scroller.

Not measured: Lighthouse; the moon and the reveals in a real browser.
