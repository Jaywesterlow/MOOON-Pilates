# Handoff — MOOON Pilates demo

For: the next Claude session, in this repo.
From: the cloud session of 1–2 October 2026 that also finished the Fuku Ramen demo.
Client: Jaymar Westerlow, JW Creative (jwcreative.nl).

Read `CLAUDE.md` first. This file says where the project stands and what Jaymar rejected.

## Where it stands

| Thing   | State                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Live    | https://mooon-pilates.vercel.app (NL) and `/en`. Vercel project `mooon-pilates`, team `jaywesterlows-projects`. Every push to `main` deploys. |
| Repo    | https://github.com/Jaywesterlow/MOOON-Pilates, branch `main`                                                                                  |
| Checks  | `npm run check`, `lint` and `build` pass on `main`                                                                                            |
| Verdict | **Jaymar rejected the first build on 2 October.** It stays live only until the rebuild replaces it.                                           |
| Mail    | Not written yet. Jaymar decided: first a demo he approves, then the mail with a link and an announced call.                                   |

## Why the first build was rejected

Jaymar looked at it in a real browser. His points, confirmed in the code:

1. **Copied from Fuku.** The previous session told the builder to "copy Fuku's conventions exactly". The nav, language switch, button (same shape, same fill hover, same magnet), demo dialog, arrow and heading reveal are Fuku's files with small edits. Visible design may never be copied from another site of his; only the invisible base may be shared (SvelteKit scaffold, GSAP/Lenis wiring in `src/lib/motion/scroll.ts`, locale routing, the dialog's open/close logic, the data typing).
2. **No hero.** The large logo, text and photo were stacked into about two screens. A hero is one screen. The logo may be emphasised (it is their strongest asset), but not at the cost of the flow.
3. **No logo in the nav.** It was hidden until the hero logo scrolled away. It reads as missing. The logo is always in the nav.
4. **Almost nothing animates.** Only headings (11b). Body text, photos, cards, the steps, the prices and the FAQ had no motion at all. The page felt bare.
5. **Two hover languages.** Hero button: fill plus magnet. Offer cards: only an arrow. One site, one hover language.
6. **01b stops too early.** The circle grew to the size of a photo and stopped. He wants a full takeover: a circle in a brand colour that grows until it fills the viewport, after which the next band continues on that colour. He prefers colour over a photo. It must never be clipped.
7. **FAQ layout.** Title left, items right, with that hover, reminds him of his Trinity project. Not in this repo's history or in his component library, but it goes: FAQ in one column.
8. **Questions about animation style.** He does not want to be asked which animation style to use. The AI decides from his library and says what it chose. Ask only when automation cannot decide, and then say that the question is there to improve the automation.

## The rebuild he agreed to (not started)

- **Hero:** exactly one screen. Logo large but inside that screen, tagline "Move slowly, feel deeply", one line, one button "Boek een proefles", address and "vandaag open tot".
- **Own visual language** from `docs/merk.md`: their colours as tokens, Aboreto for headings, Afacad for text, their logo. Redesign nav, button, language switch, footer and dialog from scratch, using the `site-design-rulebook` skill from the vault. Keep the token discipline (four text steps, one label style, spacing scale, 44 px taps).
- **Motion, three kinds, the same everywhere** (read each library entry verbatim with `read_animation`; timings are the library's):
  1. **Reveal on enter.** `16` for the display headings (H1, section H2). Everything else that enters the viewport, body text, cards, steps, prices, FAQ items, photos, uses the same direction and timing family as 16: text rises from below its line, photos open with a wipe from the bottom. One stagger rule per section. Text readable within 300 ms.
  2. **Signature, once.** `01b` as a full takeover: a circle in a brand colour (olive or the dark home gradient end, `#423D31`) grows with the scroll until it fills the viewport, whole at every frame and every viewport; the following band (the studio photos, the founders' quote) sits on that colour. Scrub, no scroll lock.
  3. **Hover, one language.** Buttons and cards both fill from the bottom and empty through the top; buttons also take `27c` (magnet). Nothing else moves on hover.
- **FAQ:** one column, heading above the list, their six questions, `FAQPage` JSON-LD stays.
- **Sections** stay as in `docs/structuur.md`: hero, trust line, what is reformer pilates, offer, first class, prices, founders, studio, more than a studio, FAQ, visit, footer.
- **Content:** unchanged, only their own facts and words (`src/lib/data/studio.nl.ts`, `studio.en.ts`). Prices must still be confirmed by MOOON.
- After the rebuild: update `CLAUDE.md` (the motion and design rules there describe the rejected build) and `docs/recept.md`.

## Facts about Jaymar for the mail (true, from him)

- His connection: his girlfriend is a pilates instructor. She is Balinese and lives in Bali. In the mail only "my girlfriend is a pilates instructor".
- He thinks MOOON's logo is very well designed; the rest of their site falls short.
- He does not do pilates himself. Do not claim otherwise.
- The cold mail skill with the story-first and connection rules lives in the Fuku repo at `docs/outreach/cold-email-SKILL.md` and `story-first.md`. The copy in his vault is older. Follow the repo copy: connection questions first, one at a time, multiple choice; every draft ends with "why this draft".

## Known traps

- `mooonpilates.nl` had to be allowed in the environment's network settings before photos could be downloaded. `scripts/photos.txt` records every photo's source URL.
- Their site runs on two domains; prices live on the old one (detoxandrollstudio.nl/reformer-pilates). Flag them as unconfirmed.
- The no-JS booking href is their Google Form via `/viewform`; their own site links the broken `/edit` URL. Not opened in a browser.
- Motion was tested with Playwright end states only. Jaymar judges feel in a real browser; believe him and reproduce before theorising.
- The vault skill `bewegingsconcept` refers to vault pages that do not exist (Animatie Per Sitetype, Bewegingsvangrails, Fotocriteria Voor Beeldsites), so it cannot run as written. Decide from the library and the guardrails in `CLAUDE.md`, and say what you chose.

## Research already done

- `docs/prospect.md`: who they are, contact, their site's shortcomings.
- `docs/structuur.md`: the agreed section list and why.
- `docs/merk.md`: colours, fonts, logo URLs.
- `docs/fotocheck.md`: every photo on their site with size and verdict; the DASHENKO shoot is the strongest.
- `docs/animatie-combinaties.html`: four sets from the library, superseded by the rebuild decisions above.
