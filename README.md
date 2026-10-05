# MOOON Pilates

Concept demo for MOOON Pilates Spijkenisse, built by JW Creative. SvelteKit, Svelte 5 with runes, TypeScript strict, plain CSS. The design is the sector's look from the `site-design-rulebook` (Dark luxury club, for premium reformer studios) in MOOON's own brand: recipe in `docs/recept.md`, measured audit in `docs/audit.md`. Nothing visible is shared with another JW Creative site.

```bash
npm install
npm run dev
```

| Script            | What it does                   |
| ----------------- | ------------------------------ |
| `npm run dev`     | Dev server                     |
| `npm run build`   | Production build (prerendered) |
| `npm run preview` | Serve the build                |
| `npm run check`   | `svelte-kit sync` + typecheck  |
| `npm run lint`    | Prettier check + ESLint        |
| `npm run format`  | Prettier write                 |

Deploys to Vercel with `@sveltejs/adapter-vercel`. Both pages are prerendered, so Vercel serves static files. Live at https://mooon-pilates.vercel.app (Vercel project `mooon-pilates`, team `jaywesterlows-projects`); every push to `main` deploys to production. That URL is `site.origin` in `src/lib/data/studio.ts`; canonical, hreflang and JSON-LD follow it.

## The page

One landing page, aimed at one action: book a trial class ("Meet the reformer", €25). A dark-first page in MOOON's night, one cream band opened by the moon. Everything hangs from one margin; three sections are centred (hero, statement, closing card), the rest start on the key line.

1. **Hero**: one screen. The reformer room as the ground, the logo, "Move slowly, feel deeply" and the booking button on the axis, the address and "open today until" in the corners.
2. **Statement**: "Where strength meets softness" and the trust line, centred.
3. **What is reformer pilates**: copy and three benefits beside a reformer (5/7).
4. **Offer**: Reformer Pilates, E-Reformer, Bodyroll, ĀYU HOUSE, Academy as photo tiles in a row that runs off the right edge, each linking to MOOON's own page.
5. **The moon**: the signature. A cream dome rises from the bottom edge over the night and fills the screen.
6. **Your first class** (on the cream): three steps, what to bring, the booking button.
7. **Prices** (on the cream): Meet the reformer on its night block, Try-out, the two class cards, Unlimited.
8. **Founders' story**: Anjali, Nasrien and Monica, their own quote (7/5).
9. **The studio**: "A soft way to feel strong", four photos from the shoot in a second carousel.
10. **More than a studio**: private classes, birthdays, company outings, workshops, events (5/7).
11. **FAQ**: their own questions and answers, heading left, rows right.
12. **Visit**: address, hours, contact in three columns.
13. **Closing card**: the front of the studio under "Meet the reformer, €25" and the button.
14. **Footer**: the logo margin to margin (it arrives as in the hero), the tagline, one row of links, legal links, "Conceptdemo · JW Creative"; the rows rise 100 ms apart.

## Languages

Dutch at `/`, English at `/en`. One route, `src/routes/[[lang=locale]]`, renders both; the matcher in `src/params/locale.ts` accepts only `en`. Facts (address, hours, prices, photos) live once in `studio.ts`; the words live in `studio.nl.ts` and `studio.en.ts`, typed against the same `Copy`, so a missing line fails `npm run check`. `hooks.server.ts` fills `<html lang>`; each page carries its canonical, `hreflang` alternates (`nl`, `en`, `x-default` → `/`) and JSON-LD: `ExerciseGym` (address, opening hours Mo–Su 07:00–23:00, prices as `Offer`s), `FAQPage` and a `WebPage` with `inLanguage`. The language link does a full page load, so `lang` and the reveals start clean.

MOOON's English taglines ("Move slowly, feel deeply", "A soft way to feel strong", …) stay English on `/`, as on their own site.

## Where things live

```
src/
  app.css                     tokens, the one margin (.frame), fonts, base, type, the reveal pre-state, links, dark bands
  routes/
    [[lang=locale]]/
      +layout.ts              prerender + the content for `/` or `/en`
      +layout.svelte          nav, footer, dialog, head (canonical, hreflang, JSON-LD), smooth scroll, the clock
      +page.ts                prerender entries for both languages
      +page.svelte            composes the sections
  params/locale.ts            only `en` is a language segment
  hooks.server.ts             `<html lang>` per page
  lib/
    data/studio.ts            facts in every language, and `content.nl` / `content.en`
    data/studio.nl.ts         the Dutch words
    data/studio.en.ts         the English words
    data/opening.ts           "open today until" as a pure function
    data/schema.ts            ExerciseGym + FAQPage + WebPage from the same object
    state/opening.svelte.ts   rune class: the clock the site reads
    state/demo.svelte.ts      rune class: the demo dialog behind every booking button and outward link
    motion/scroll.ts          GSAP + ScrollTrigger + Lenis on one clock, 16's curve as a CustomEase
    motion/attachments.ts     revealWords (16), rise, wipe, revealLogo, moonRise (01b) as Svelte attachments
    assets/photos.ts          photos through enhanced-img
    assets/logo-parts.ts      MOOON's logo as six SVG paths (M, O, O, O, N, PILATES) and the O's circles, generated
    assets/logo-*.png         MOOON's logo PNGs, the trace source
    components/               Heading, Rise, Photo, Tile, Button, Logo, Roll, FaqItem, LangSwitch (the pieces); one file per section
static/fonts/                 Aboreto and Afacad, latin + latin-ext
scripts/photos.txt            which upload on mooonpilates.nl became which photo
scripts/trace-logo.py         traces the logo PNG into the six paths of assets/logo-parts.ts
docs/                         prospect, structure, brand, photo check, recipe, audit, screenshots
```

## What Svelte does here

| Tool                                           | Where                                | Why                                                                                                     |
| ---------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `{@attach}` attachments                        | `motion/attachments.ts`              | Every reveal and the moon are set up and cleaned up with the element they move                          |
| `$state` / `$derived` in a class               | `state/opening.svelte.ts`            | One clock; "Open today until 23:00" in the hero and the visit section derive from it                    |
| `$effect` with cleanup                         | `+layout.svelte`                     | Starts and stops the clock, Lenis and the ScrollTrigger refresh                                         |
| `prefersReducedMotion`                         | attachments, button, layout          | Reveals, the moon, the magnet and smooth scroll switch off live with the visitor's setting              |
| `MediaQuery` + `Tween`                         | `Button`                             | Magnetic button only with a real cursor; 200 ms expo-out as in library 27c                              |
| Snippets                                       | `Button`, `Rise`                     | The button label renders twice (text and fill) from one snippet; `Rise` wraps anything in its mask      |
| `transition:fade`                              | `Nav`                                | The phone menu                                                                                          |
| `<svelte:element>`                             | `Heading`                            | One heading component for `h1` and `h2`                                                                 |
| `load` + `prerender` + `entries`               | `+layout.ts`, `+page.ts`             | Content reaches components as props, per language                                                       |
| Optional param + matcher, `transformPageChunk` | `[[lang=locale]]`, hooks             | `/` and `/en` from one set of components; `<html lang>` right in the prerendered HTML                   |
| `<enhanced:img>`                               | every photo                          | AVIF and WebP, `srcset`, intrinsic size                                                                 |
| `slide` transition                             | `FaqItem.svelte`                     | The answer opens and closes with height, 250/200 ms, and is gone from the DOM when closed               |
| `<dialog>` + `{@attach}`, rune class           | `DemoDialog`, `state/demo.svelte.ts` | Every booking button opens the demo dialog in the same frame; Esc, backdrop and focus return are native |

## Motion

Three kinds of movement, no more. Library ids 16, 01b and 27c; the full account, with the one timing deviation, is in `docs/recept.md`.

- **Reveal on enter (16)**: display headings as the library has it (words rise from under the line below, 1.4 s / 1.7 s, `cubic-bezier(.83,.01,.29,1)`); everything else rises out of a mask from below its line or, for a photo, opens with a wipe from the bottom, 0.7 s on the same curve. One stagger rule: 100 ms between whatever enters in the same frame.
- **The moon (01b)**: as the library has it. A circle in `--paper` opens from the bottom edge of the stage (`circle(0% at 50% 100%)` to `circle(120% at 50% 100%)`), so only its top half is seen: a dome that grows with the scroll until it fills the screen. The moon element is two screens tall and lies over the section before it, so the dome rises over the offer tiles instead of being cut flat by the stage's top; 120 % of that taller box rises and covers at the same moments as the library's 150 % of one screen. The first class and the prices continue on that colour. Scrub only, no pin.
- **The logo**: in the hero at load, in the footer when it scrolls in, from the inside out on 16's 1.4 s. The three O's are crescents and wax like moons: each one's SVG mask holds a shadow circle that starts over the whole ring and moves to the cut-out's place while it shrinks, so the thick side shows first. The middle O starts first, the outer two at 0.3 s; the M and the N rise out of a wipe from the bottom at 0.7 s, PILATES at 1.0 s. About 2.4 s in all.
- **Hover (27c)**: buttons and tiles fill from the bottom and empty through the top; every button leans 30 % toward the cursor, 200 ms expo-out, with a real cursor only. Text links roll (`Roll.svelte`): the label slides up out of its line while a copy comes in from below, 0.38 s on 16's curve. A rise mask lets its content overflow once the rise is done, so a magnet button is never clipped by it.

GSAP alone sets the start state of a reveal. Until it has, `html.js [data-reveal]` is `visibility: hidden` (no transform), with a 3 s CSS fallback in case JavaScript dies. Under `prefers-reduced-motion` nothing is hidden, the moon stage is a short cream block and Lenis is off. The demo dialog fades in over 0.2 s (opacity only) and holds the page still while open.

## Photos and logo

All MOOON's own, downloaded from mooonpilates.nl on 1 October 2026 and looked at before use: the DASHENKO shoot (April 2026) first, then their studio photos. No stock, no AI images, no screenshots, no HEIC. `scripts/photos.txt` records which upload became which file. The logo is their 2350 × 810 PNG traced into six SVG paths (`scripts/trace-logo.py` with potracer). The three O's are crescents, each a circle with a smaller circle cut out off centre, and they overlap: the script fits that pair of circles to each ring (within about a pixel), gives every ink pixel to the ring whose model holds it, a crossing to both, and traces each ring on its own; the circles are kept in `logoRings` for the reveal. Rendered inline by `Logo.svelte` with `currentColor`, never recoloured or cropped. The PNGs stay in the repo as the trace source. The hero ground is their reformer room (`IMG_6578`), the only landscape photo of theirs wide enough for a full-screen ground; the front of the studio carries the closing card.

## Dependencies beyond the scaffold

- `gsap`, `lenis`: the demo motion stack (16, 01b, smooth scroll). `gsap/CustomEase` carries 16's curve.
- `@sveltejs/enhanced-img`: image pipeline.

## Fonts

Self-hosted from `static/fonts/`, no Google Fonts request: Aboreto (headings) and Afacad (text, variable 400–700), MOOON's own pair. Latin and latin-ext subsets, for the Ā in ĀYU HOUSE. The latin files are preloaded in `src/app.html`. Both are licensed under the SIL Open Font License 1.1.

## Still open

- **Prices must be rechecked with MOOON** before this is shown as current. They come from mooonpilates.nl/prijzen-en-faqs (1 October 2026). "Meet the reformer" and "Proefles" are both €25 there and are shown as one; the Early Founders offer (until 1 September) is left out.
- **Booking**: every booking button opens a "this is a concept demo" dialog, so the demo never takes a real booking. The no-JS href is MOOON's own Google form at its public `/viewform` URL; their site links the `/edit` URL, which shows "Request edit access". The `/viewform` URL was not opened from here. After the form, booking runs in the MOOON Pilates app (Android) or Virtuagym (Apple).
- **Legal**: their terms PDF still carries the old name, Detox and Roll Studio. The footer links it as their own site does.
- **People in the photos** are not named: the site does not say who is in the DASHENKO shoot. The founders are named only in their own signature.
- **Logo paths**: traced from the PNG, not drawn. If Jaymar redraws the logo, his paths replace `logo-parts.ts` under the same six ids. The moon is still the library's circle, not the logo's O.
- **Favicon**: a simple moon mark in their colours; their own site icon (512 px JPG) was too soft to reuse.
