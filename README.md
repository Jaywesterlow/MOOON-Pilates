# MOOON Pilates

Concept demo for MOOON Pilates Spijkenisse, built by JW Creative. SvelteKit, Svelte 5 with runes, TypeScript strict, plain CSS. The design is MOOON's own brand, built from the `site-design-rulebook` (recipe in `docs/recept.md`); nothing visible is shared with another JW Creative site.

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

One landing page, aimed at one action: book a trial class ("Meet the reformer", €25). Everything hangs from one margin; the nav, the hero, every band and the footer pad with the same `--margin`.

1. **Hero**: one screen under the bar. The reformer room as the ground, the logo central, "Move slowly, feel deeply", the booking button, the address and "open today until".
2. **Trust line**: certified studio and instructors, Classical and Contemporary, beginners and advanced.
3. **What is reformer pilates**: one paragraph, three benefits, a reformer.
4. **Offer**: Reformer Pilates, E-Reformer, Bodyroll, ĀYU HOUSE, Academy, five cards in a row that runs off the right edge, each linking to MOOON's own page.
5. **Your first class**: three steps, what to bring, the booking button, on the panel colour.
6. **Prices**: Meet the reformer on its dark block, Try-out, the two class cards, Unlimited.
7. **The moon**: the signature. A circle in MOOON's night colour rises and fills the screen.
8. **The studio** (on the moon's colour): "A soft way to feel strong", three photos from the shoot.
9. **Founders' story** (on the moon's colour): Anjali, Nasrien and Monica, their own quote.
10. **More than a studio**: private classes, birthdays, company outings, workshops, events.
11. **FAQ**: their own questions and answers, title left, rows right.
12. **Visit & contact**: address, hours, WhatsApp, e-mail, the booking button, the front of the studio edge to edge.
13. **Footer**: a dark band, the logo margin to margin, contact, socials, the other language, legal links, "Conceptdemo · JW Creative".

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
    state/booking.svelte.ts   rune class: the demo dialog behind every booking button
    motion/scroll.ts          GSAP + ScrollTrigger + Lenis on one clock, 16's curve as a CustomEase
    motion/attachments.ts     revealWords (16), rise, wipe, moonRise (01b) as Svelte attachments
    assets/photos.ts          photos through enhanced-img
    assets/logo-*.png         MOOON's logo, black and white
    components/               Heading, Rise, Photo, Button, Logo, LangSwitch (the pieces); one file per section
static/fonts/                 Aboreto and Afacad, latin + latin-ext
scripts/photos.txt            which upload on mooonpilates.nl became which photo
docs/                         prospect, structure, brand, photo check, recipe, screenshots
```

## What Svelte does here

| Tool                                           | Where                                   | Why                                                                                                     |
| ---------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `{@attach}` attachments                        | `motion/attachments.ts`                 | Every reveal and the moon are set up and cleaned up with the element they move                          |
| `$state` / `$derived` in a class               | `state/opening.svelte.ts`               | One clock; "Open today until 23:00" in the hero and the visit section derive from it                    |
| `$effect` with cleanup                         | `+layout.svelte`                        | Starts and stops the clock, Lenis and the ScrollTrigger refresh                                         |
| `prefersReducedMotion`                         | attachments, button, layout             | Reveals, the moon, the magnet and smooth scroll switch off live with the visitor's setting              |
| `MediaQuery` + `Tween`                         | `Button`                                | Magnetic button only with a real cursor; 200 ms expo-out as in library 27c                              |
| Snippets                                       | `Button`, `Rise`                        | The button label renders twice (text and fill) from one snippet; `Rise` wraps anything in its mask      |
| `transition:fade`                              | `Nav`                                   | The phone menu                                                                                          |
| `<svelte:element>`                             | `Heading`                               | One heading component for `h1` and `h2`                                                                 |
| `load` + `prerender` + `entries`               | `+layout.ts`, `+page.ts`                | Content reaches components as props, per language                                                       |
| Optional param + matcher, `transformPageChunk` | `[[lang=locale]]`, hooks                | `/` and `/en` from one set of components; `<html lang>` right in the prerendered HTML                   |
| `<enhanced:img>`                               | every photo and the logo                | AVIF and WebP, `srcset`, intrinsic size                                                                 |
| `<dialog>` + `{@attach}`, rune class           | `BookDialog`, `state/booking.svelte.ts` | Every booking button opens the demo dialog in the same frame; Esc, backdrop and focus return are native |

## Motion

Three kinds of movement, no more. Library ids 16, 01b and 27c; the full account, with the one timing deviation, is in `docs/recept.md`.

- **Reveal on enter (16)**: display headings as the library has it (words rise from under the line below, 1.4 s / 1.7 s, `cubic-bezier(.83,.01,.29,1)`); everything else rises out of a mask from below its line or, for a photo, opens with a wipe from the bottom, 0.7 s on the same curve. One stagger rule: 100 ms between whatever enters in the same frame.
- **The moon (01b)**: a circle in `--night` grows with the scroll until it fills the screen, whole at every frame (it rises with its bottom on the bottom edge, then grows on from the middle). The studio and the founders continue on that colour. Scrub only, no pin.
- **Hover (27c)**: buttons and cards fill from the bottom and empty through the top; every button leans 30 % toward the cursor, 200 ms expo-out, with a real cursor only.

GSAP alone sets the start state of a reveal. Until it has, `html.js [data-reveal]` is `visibility: hidden` (no transform), with a 3 s CSS fallback in case JavaScript dies. Under `prefers-reduced-motion` nothing is hidden, the moon stage is a short dark block and Lenis is off. The demo dialog fades in over 0.2 s (opacity only) and holds the page still while open.

## Photos and logo

All MOOON's own, downloaded from mooonpilates.nl on 1 October 2026 and looked at before use: the DASHENKO shoot (April 2026) first, then their studio photos. No stock, no AI images, no screenshots, no HEIC. `scripts/photos.txt` records which upload became which file. The logo is their black and white PNG (2350 × 810), never recoloured or cropped. The hero ground is their reformer room (`IMG_6578`), the only landscape photo of theirs wide enough for a full-screen ground.

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
- **Logo as SVG**: Jaymar is rebuilding it; the hero and the moon are built so the parts can drop in.
- **Favicon**: a simple moon mark in their colours; their own site icon (512 px JPG) was too soft to reuse.
