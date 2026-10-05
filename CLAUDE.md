# Working on this repo

Concept demo for MOOON Pilates Spijkenisse by JW Creative. Read `HANDOFF.md` first: it says where the project stands, why the first build was rejected and what the second and third builds changed. Then `docs/prospect.md` for the client, `docs/recept.md` for the design recipe (the sector look and every deviation), `docs/audit.md` for the measured audit and `README.md` for the stack.

## How Jaymar wants you to work

- **Short answers.** He asked for "caveman" replies: the outcome in a few short lines, no preamble, no recap of what he can see himself. Details go in files, not in chat. He writes Dutch or English; answer in the language he used.
- **Say what you did not verify.** If you could not watch something run, say so in one line.
- **Git is your job.** Branch (`feat/…`, `fix/…`, `chore/…`, `docs/…`), commit with Conventional Commits, merge to `main`, push, then report. Do not ask permission for routine git, and do not hand him commands to run. Ask first only before anything that destroys work.
- **Pushing to `main` deploys to production** on Vercel. Run `npm run check`, `npm run lint` and `npm run build` before you push.
- **Mail is never sent by you.** Draft only; he sends.
- **Do not ask which animation style to use.** Decide from his library (`read_animation` in the vault) and say what you chose. Ask only when the automation cannot decide, and say that the question is there to improve the automation.
- **Design goes through the `site-design-rulebook` skill in the vault.** Name the sector, pick the look in `looks.md`, write the recipe, build, audit with the skill's scripts (`docs/audit.md` shows the run). Research gaps stop the work: where the vault has no rule or template for something the design needs, stop, name the gap, and let him broaden the vault first. Improvising there is what got the first build rejected.
- **Never copy visible design from another JW Creative site** (Fuku Ramen or any other). Only the invisible base may be shared: the SvelteKit scaffold, the GSAP/Lenis wiring in `src/lib/motion/scroll.ts`, the locale routing, the dialog's open/close logic, the data typing.

## Stack rules

- SvelteKit, Svelte 5 with runes only (`$state`, `$derived`, `$effect`, `$props`). TypeScript strict. Plain CSS, tokens in `src/app.css`. npm.
- Use what Svelte gives: attachments (`{@attach}`) for DOM motion, rune classes in `.svelte.ts` for shared state, `prefersReducedMotion`, `MediaQuery`, `Tween`, snippets, transitions, `load` with prerender, `<enhanced:img>`. Do not fall back to hand-rolled listeners or `document.querySelector` in components.
- Components are `PascalCase.svelte` in `src/lib/components`, the page-level ones exported through `src/lib/index.ts`. Content lives in `src/lib/data/studio.ts` (facts) and `studio.nl.ts` / `studio.en.ts` (words), never hard-coded in a component.
- Scripts in `package.json` stay at `dev`, `build`, `preview`, `check`, `lint`, `format`.
- New dependencies need a reason in the README.

## Design rules

- The look is the sector's: **Dark luxury club** (physiotherapy, gym or yoga studio, SB) in MOOON's own brand. The ground is their night (`--night`), the text their cream; one cream band (`.light`) for the first class and the prices, opened by the moon. Colours from their Elementor kit as tokens in `src/app.css`, Aboreto for headings, Afacad for text, both self-hosted. No chromatic accent: cream buttons on the night, night buttons on the band, olive as the hover fill.
- Their logo is the strongest asset: central in the hero, across the footer, small in the nav, always white on the night. Never recolour or crop it. Jaymar is rebuilding it as SVG ("MOOON", "PILATES", and the three O's as loose shapes); until then the PNG stays.
- **One margin everywhere.** `.frame` pads with `--margin` (a 1350 frame, 45 px gutters at 1440, 24 on a phone); the nav, the hero, every band and the footer use it. The centring budget is book-ends + 1: the hero, the statement and the closing card are centred, everything else starts on the key line. One split, 5/7, or its mirror.
- The type scale is the tokens: four text steps (`--text-label`, `--text-small`, `--text-body`, `--text-lede`), `--text-price`, `--text-h2`, `--text-h1`, plus 16 px for the FAQ question. One caps style (`.label`, 13 px, +0.10em) for labels, nav links and buttons. Spacing from `--space-1` to `--space-8`; section padding `--section`, the one sparse step `--sparse`. Every tap target at least `--tap` (44 px). `text-wrap: pretty` on running text, `balance` on headings.
- One radius, `--r` (8 px), on photos, tiles, buttons and the price block. One edge technique: 1 px hairlines (`.rows`). No shadows. No arrows in copy or on links.
- The sector's break is the carousel: tiles from the left margin off the right edge, the last one cut (`Offer`, `Studio`).
- The recipe, its rule ids and its deviations are in `docs/recept.md`; the numbers in `docs/audit.md`.

## Motion rules

- GSAP + ScrollTrigger + Lenis, one clock (`src/lib/motion/scroll.ts`). Library ids 16, 01b and 27c; timings are the library's where the library gives them (the one documented exception is in `docs/recept.md`).
- Exactly three kinds of movement:
  1. **Reveal on enter**, one family for the whole page, from 16: display headings run 16 as the library has it (`Heading.svelte`, `revealWords`); everything else rises out of a mask from below its line (`Rise.svelte`, `rise`) or, for a photo, opens with a wipe from the bottom (`Photo.svelte`, `wipe`), on 16's curve. One stagger rule: what enters in the same frame follows at 100 ms. What is on the first screen at load plays at once.
  2. **Signature, once**: 01b as a full takeover (`Moon.svelte`, `moonRise`). A circle in `--paper` rises over the night page and grows with the scroll until it fills the screen; the cream band after it continues on that colour. Whole at every frame and every viewport, scrub only, no pin, no scroll lock.
  3. **Hover, one language**: buttons and tiles fill from the bottom and empty through the top; the button's fill carries its own copy of the label; every button also takes 27c (the magnet). Text links change colour only. The bar gains its surface once, as the hero leaves. Nothing else moves on hover.
- GSAP alone sets the start state of a reveal. No CSS transform on an element GSAP animates. Until GSAP has run, `html.js [data-reveal]` is `visibility: hidden` with a 3 s fallback.
- The page is complete under `prefers-reduced-motion`: nothing hidden, the moon stage a short cream block, Lenis off.

## Content rules

- Only facts and words from mooonpilates.nl (and `docs/`). No invented classes, reviews, numbers or quotes.
- Dutch on `/`, English on `/en`. MOOON's English taglines stay English on both. Little text.
- Every booking button opens the demo dialog; the href stays MOOON's own sign-up form.
- Prices must still be confirmed by MOOON.
