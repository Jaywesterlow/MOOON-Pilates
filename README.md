# MOOON Pilates

Concept demo for MOOON Pilates Spijkenisse, built by JW Creative. SvelteKit, Svelte 5 with runes, TypeScript strict, plain CSS. Sister project of the Fuku Ramen demo, same conventions.

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

Deploys to Vercel with `@sveltejs/adapter-vercel`. Both pages are prerendered, so Vercel serves static files. The production URL in `site.origin` (`src/lib/data/studio.ts`) is assumed to be `https://mooon-pilates.vercel.app`; change it there once the project exists, and canonical, hreflang and JSON-LD follow.

## The page

One landing page, aimed at one action: book a trial class ("Meet the reformer", €25).

1. **Hero**: the logo large, "Move slowly, feel deeply", one line, the booking button, the address and "open today until 23:00".
2. **Trust line**: certified studio and instructors, Classical and Contemporary, beginners and advanced.
3. **What is reformer pilates**: one paragraph, three benefits.
4. **Offer**: Reformer Pilates, E-Reformer, Bodyroll, ĀYU HOUSE, Academy, each linking to MOOON's own page.
5. **Your first class**: three steps, what to bring, the booking button.
6. **Prices**: Meet the reformer, Try-out, the two class cards, Unlimited.
7. **Founders' story**: Anjali, Nasrien and Monica, their own quote.
8. **The studio**: the moon (01b) opens on the reformer room, then three photos from the shoot.
9. **More than a studio**: private classes, birthdays, company outings, workshops, events.
10. **FAQ**: their own questions and answers.
11. **Visit & contact**: address, hours, WhatsApp, e-mail, the booking button, the front of the studio.
12. **Footer**: the logo across the full width, socials, their legal links, "Conceptdemo · JW Creative".

## Languages

Dutch at `/`, English at `/en`. One route, `src/routes/[[lang=locale]]`, renders both; the matcher in `src/params/locale.ts` accepts only `en`. Facts (address, hours, prices, photos) live once in `studio.ts`; the words live in `studio.nl.ts` and `studio.en.ts`, typed against the same `Copy`, so a missing line fails `npm run check`. `hooks.server.ts` fills `<html lang>`; each page carries its canonical, `hreflang` alternates (`nl`, `en`, `x-default` → `/`) and JSON-LD: `ExerciseGym` (address, opening hours Mo–Su 07:00–23:00, prices as `Offer`s), `FAQPage` and a `WebPage` with `inLanguage`. The NL / EN switch does a full page load, so `lang` and the reveals start clean.

MOOON's English taglines ("Move slowly, feel deeply", "A soft way to feel strong", …) stay English on `/`, as on their own site.

## Where things live

```
src/
  app.css                     tokens, fonts, base, type, the reveal pre-state, the link styles
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
    motion/scroll.ts          GSAP + ScrollTrigger + Lenis on one clock
    motion/attachments.ts     11b and 01b as Svelte attachments
    assets/photos.ts          photos through enhanced-img
    assets/logo-*.png         MOOON's logo, black and white
    components/               one file per section, plus the shared pieces
static/fonts/                 Aboreto and Afacad, latin + latin-ext
scripts/photos.txt            which upload on mooonpilates.nl became which photo
docs/                         prospect, structure, brand, photo check, animation sets, recipe, screenshots
```

## What Svelte does here

| Tool                                                     | Where                                   | Why                                                                                                     |
| -------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `{@attach}` attachments                                  | `motion/attachments.ts`                 | Every reveal is set up and cleaned up with the element it moves                                         |
| `$state` / `$derived` in a class                         | `state/opening.svelte.ts`               | One clock; "Open today until 23:00" in the hero and the visit section derive from it                    |
| `$effect` with cleanup                                   | `+layout.svelte`                        | Starts and stops the clock, Lenis and the ScrollTrigger refresh                                         |
| `prefersReducedMotion`                                   | attachments, button, layout             | Reveals, the moon, the magnet and smooth scroll switch off live with the visitor's setting              |
| `scrollY`, `innerHeight` from `svelte/reactivity/window` | `Nav`                                   | The small logo and the solid bar appear once the hero's large logo has gone; no listener                |
| `MediaQuery` + `Tween`                                   | `Button`                                | Magnetic button only with a real cursor; 200 ms expo-out as in library 27c                              |
| Snippets                                                 | `Button`                                | The label renders twice (text and fill) from one snippet                                                |
| `transition:fade`                                        | `Nav`                                   | Mobile menu                                                                                             |
| `<svelte:element>`                                       | `RevealHeading`                         | One heading component for `h1` and `h2`                                                                 |
| `load` + `prerender` + `entries`                         | `+layout.ts`, `+page.ts`                | Content reaches components as props, per language                                                       |
| Optional param + matcher, `transformPageChunk`           | `[[lang=locale]]`, hooks                | `/` and `/en` from one set of components; `<html lang>` right in the prerendered HTML                   |
| `<enhanced:img>`                                         | every photo and the logo                | AVIF and WebP, `srcset`, intrinsic size                                                                 |
| `<dialog>` + `{@attach}`, rune class                     | `BookDialog`, `state/booking.svelte.ts` | Every booking button opens the demo dialog in the same frame; Esc, backdrop and focus return are native |

## Motion

Three kinds of movement, no more. Library ids and timings verbatim:

- **11b**, every heading: lines slide up from their mask, 110 % → 0, 1.2 s expo-out, 80 ms stagger, at `top 85%`, reset once below the screen. The hero heading runs the same curve in CSS on load, so it never waits for JavaScript.
- **01b**, the signature, in the studio section: a circle opens on the reformer room, scrubbed `top bottom` → `top top`, `ease: none`. One change on purpose: in the library the centre stays on the bottom edge, so the top of the circle is always cut off. Here the disc is a square sized to fit between the nav and the bottom of every screen, and the circle rises while it grows (`circle(0% at 50% 100%)` → `circle(50% at 50% 50%)`): its bottom stays on the edge and its radius is always half its height, so the whole circle is visible at every frame. A full moon rising, the middle O of their logo.
- **27c**, the booking buttons: the button leans 30 % toward the cursor, 200 ms expo-out, only with a real cursor. The fill comes in from the bottom and leaves through the top, with its own copy of the label.

GSAP alone sets the start state of a reveal. Until it has, `html.js [data-reveal]` is `visibility: hidden` (no transform), with a 3 s CSS fallback in case JavaScript dies. Under `prefers-reduced-motion` nothing is hidden, the moon is open and Lenis is off. The demo dialog fades in over 0.45 s (opacity only) and holds the page still while open.

## Photos and logo

All MOOON's own, downloaded from mooonpilates.nl on 1 October 2026 and looked at before use: the DASHENKO shoot (April 2026) first, then their studio photos. No stock, no AI images, no screenshots, no HEIC. `scripts/photos.txt` records which upload became which file. The logo is their black and white PNG (2350 × 810), never recoloured or cropped.

## Dependencies beyond the scaffold

- `gsap`, `lenis`: the demo motion stack (11b, 01b, smooth scroll).
- `@sveltejs/enhanced-img`: image pipeline.

## Fonts

Self-hosted from `static/fonts/`, no Google Fonts request: Aboreto (headings) and Afacad (text, variable 400–700), MOOON's own pair. Latin and latin-ext subsets, for the Ā in ĀYU HOUSE. The latin files are preloaded in `src/app.html`. Both are licensed under the SIL Open Font License 1.1.

## Still open

- **Prices must be rechecked with MOOON** before this is shown as current. They come from mooonpilates.nl/prijzen-en-faqs (1 October 2026). "Meet the reformer" and "Proefles" are both €25 there and are shown as one; the Early Founders offer (until 1 September) is left out.
- **Booking**: every booking button opens a "this is a concept demo" dialog, so the demo never takes a real booking. The no-JS href is MOOON's own Google form at its public `/viewform` URL; their site links the `/edit` URL, which shows "Request edit access". The `/viewform` URL was not opened from here. After the form, booking runs in the MOOON Pilates app (Android) or Virtuagym (Apple).
- **Legal**: their terms PDF still carries the old name, Detox and Roll Studio. The footer links it as their own site does.
- **People in the photos** are not named: the site does not say who is in the DASHENKO shoot. The founders are named only in their own signature.
- **Favicon**: a simple moon mark in their colours; their own site icon (512 px JPG) was too soft to reuse.
