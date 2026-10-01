# Working on this repo

Concept demo for MOOON Pilates Spijkenisse by JW Creative. Read `docs/prospect.md` for the client and `README.md` for the state of the project and the open work.

## How Jaymar wants you to work

- **Short answers.** He asked for "caveman" replies: the outcome in a few short lines, no preamble, no recap of what he can see himself. Details go in files, not in chat. He writes Dutch or English; answer in the language he used.
- **Say what you did not verify.** If you could not watch something run, say so in one line.
- **Git is your job.** Branch (`feat/…`, `fix/…`, `chore/…`, `docs/…`), commit with Conventional Commits, merge to `main`, push, then report. Do not ask permission for routine git, and do not hand him commands to run. Ask first only before anything that destroys work.
- **Pushing to `main` deploys to production** once Vercel is connected. Run `npm run check`, `npm run lint` and `npm run build` before you push.
- **Mail is never sent by you.** Draft only; he sends.

## Stack rules

- SvelteKit, Svelte 5 with runes only (`$state`, `$derived`, `$effect`, `$props`). TypeScript strict. Plain CSS, tokens in `src/app.css`. npm.
- Use what Svelte gives: attachments (`{@attach}`) for DOM motion, rune classes in `.svelte.ts` for shared state, `prefersReducedMotion`, `MediaQuery`, `Tween`, `svelte/reactivity/window`, snippets, transitions, `load` with prerender, `<enhanced:img>`. Do not fall back to hand-rolled listeners or `document.querySelector` in components.
- Components are `PascalCase.svelte` in `src/lib/components`, exported through `src/lib/index.ts`. Content lives in `src/lib/data/studio.ts` (facts) and `studio.nl.ts` / `studio.en.ts` (words), never hard-coded in a component.
- Scripts in `package.json` stay at `dev`, `build`, `preview`, `check`, `lint`, `format`.
- New dependencies need a reason in the README.

## Design rules

- MOOON's own brand only: the colours of their Elementor kit as tokens in `src/app.css`, Aboreto for headings, Afacad for text, both self-hosted. Their logo is the strongest asset: large in the hero and across the footer, small in the nav once the hero has gone. Never recolour or crop it.
- The type scale is the tokens: four text steps (`--text-label`, `--text-small`, `--text-body`, `--text-lede`), `--text-price`, `--text-h2`, `--text-h1`. One uppercase label style (`.label`). Spacing from `--space-1` to `--space-8`. Every tap target at least `--tap` (44 px). `text-wrap: pretty` on running text, `balance` on headings.
- The recipe and its deviations are in `docs/recept.md`.

## Motion rules

- GSAP + ScrollTrigger + Lenis. Timings are the animation library's (11b, 01b, 27c); do not tune them.
- Exactly three kinds of movement: 11b (heading lines from their mask), 01b (the moon, the one signature moment, in the studio section) and 27c (the magnetic booking button).
- GSAP alone sets the start state of a reveal. No CSS transform on an element GSAP animates.
- Text readable within 300 ms, no scroll lock, the page complete under `prefers-reduced-motion`.
- The moon's circle must be whole at every frame and every viewport (see `moonRise` in `src/lib/motion/attachments.ts`).
- Button fills move one way: in from the bottom, out through the top. The fill carries its own copy of the label.

## Content rules

- Only facts and words from mooonpilates.nl (and `docs/`). No invented classes, reviews, numbers or quotes.
- Dutch on `/`, English on `/en`. MOOON's English taglines stay English on both. Little text.
- Every booking button opens the demo dialog; the href stays MOOON's own sign-up form.
