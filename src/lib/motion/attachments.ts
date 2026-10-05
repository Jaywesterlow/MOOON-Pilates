import type { Attachment } from 'svelte/attachments';
import { prefersReducedMotion } from 'svelte/motion';
import { gsap, RISE, ScrollTrigger } from './scroll';

/**
 * Motion as Svelte attachments: `{@attach rise()}` on the element that moves.
 * Each one reads `prefersReducedMotion.current`, so it re-runs when the visitor flips the
 * setting, and each returns a cleanup that leaves the element in its resting state.
 *
 * Two of the page's three kinds of movement live here. The third, 27c, is the magnetic button
 * in `Button.svelte`.
 *
 * 1. Reveal on enter, one family for the whole page, from library entry 16: words rise from
 *    below their line, inside two nested masks, on the curve `cubic-bezier(.83,.01,.29,1)`.
 *    Display headings run 16 as the library has it (`revealWords`). Everything else that enters
 *    the screen moves the same way: text rises out of a mask below its line (`rise`), a photo
 *    opens with a wipe from the bottom (`wipe`). One stagger rule for all of it: elements that
 *    enter in the same frame follow each other at 100 ms, the step of 16's own lines.
 * 2. The signature, once: 01b as a full takeover (`moonRise`).
 *
 * GSAP alone sets the start state. Until it has, `html.js [data-reveal]` is `visibility: hidden`
 * (app.css), so nothing flashes before hydration; each attachment sets its start state and then
 * `visibility: visible` inline in the same frame. No CSS transform ever sits on these elements.
 */

/** Where a reveal below the first screen starts: the top of the element at 90% of the screen. */
const START = 'top 90%';
/** The duration for the rises and wipes outside the display headings: the expressive family's upper bound. */
const DURATION = 0.7;
/** 16's own step between lines. */
const STEP = 0.1;
/** 16's own duration for a line. */
const WORD = 1.4;

/** On the first screen at load: play now (after the shared stagger) instead of waiting for a scroll. */
function onScreen(node: HTMLElement): boolean {
	const box = node.getBoundingClientRect();
	return box.top < window.innerHeight && box.bottom > 0;
}

/* Elements whose triggers fire in the same frame share one stagger: 0, 0.1, 0.2 … capped at six. */
let inFrame = 0;
let frameQueued = false;
function staggerDelay(): number {
	const delay = Math.min(inFrame, 5) * STEP;
	inFrame += 1;
	if (!frameQueued) {
		frameQueued = true;
		queueMicrotask(() => {
			inFrame = 0;
			frameQueued = false;
		});
	}
	return delay;
}

/**
 * 16 — the display headings. The markup is `Heading.svelte`'s: every `.line` is a mask, every
 * word in it a `.clip` mask. The line rises 50 % and the word 120 % (the word comes out from
 * under the line below), 1.4 s and 1.7 s, on 16's curve, each line 0.10 / 0.20 / 0.25 s after
 * the one above. Plays once.
 */
export function revealWords(): Attachment<HTMLElement> {
	return (node) => {
		if (prefersReducedMotion.current) return;

		const lines = Array.from(node.querySelectorAll<HTMLElement>('.line'));
		const clips = node.querySelectorAll<HTMLElement>('.clip');
		gsap.set(lines, { yPercent: 50 });
		gsap.set(clips, { yPercent: 120 });
		gsap.set(node, { visibility: 'visible' });

		const lineDelay = (i: number) => [0, 0.1, 0.2, 0.25][i] ?? 0.25 + 0.05 * (i - 3);
		const timeline = gsap.timeline({ paused: true });
		lines.forEach((line, i) => {
			timeline
				.to(line, { yPercent: 0, duration: 1.4, ease: RISE }, lineDelay(i))
				.to(
					line.querySelectorAll('.clip'),
					{ yPercent: 0, duration: 1.7, ease: RISE },
					lineDelay(i)
				);
		});

		const play = () => timeline.delay(staggerDelay()).play();
		const trigger = onScreen(node)
			? (play(), null)
			: ScrollTrigger.create({ trigger: node, start: START, once: true, onEnter: play });

		return () => {
			trigger?.kill();
			timeline.kill();
			gsap.set([...lines, ...clips], { clearProps: 'transform' });
		};
	};
}

/**
 * The rest of the text, the cards, the steps, the prices, the FAQ rows: the element rises out of
 * a mask from below its own line (100 % → 0), 0.7 s on 16's curve. `Rise.svelte` provides the mask.
 */
export function rise(): Attachment<HTMLElement> {
	return (node) => {
		if (prefersReducedMotion.current) return;

		gsap.set(node, { yPercent: 100 });
		gsap.set(node, { visibility: 'visible' });

		const mask = node.parentElement ?? node;
		// once up, the mask opens: a button inside may lean out of it toward the cursor (27c)
		const tween = gsap.to(node, {
			yPercent: 0,
			duration: DURATION,
			ease: RISE,
			paused: true,
			onComplete: () => (mask.style.overflow = 'visible')
		});
		const play = () => tween.delay(staggerDelay()).play();
		const trigger = onScreen(mask)
			? (play(), null)
			: ScrollTrigger.create({ trigger: mask, start: START, once: true, onEnter: play });

		return () => {
			trigger?.kill();
			tween.kill();
			mask.style.overflow = '';
			gsap.set(node, { clearProps: 'transform' });
		};
	};
}

/**
 * Photos open with a wipe from the bottom: the visible part starts on the bottom edge and grows
 * up until the photo is whole, 0.7 s on 16's curve. The same direction as the text.
 */
export function wipe(): Attachment<HTMLElement> {
	return (node) => {
		if (prefersReducedMotion.current) return;

		gsap.set(node, { clipPath: 'inset(100% 0% 0% 0%)' });
		gsap.set(node, { visibility: 'visible' });

		const tween = gsap.to(node, {
			clipPath: 'inset(0% 0% 0% 0%)',
			duration: DURATION,
			ease: RISE,
			paused: true
		});
		const play = () => tween.delay(staggerDelay()).play();
		const trigger = onScreen(node)
			? (play(), null)
			: ScrollTrigger.create({ trigger: node, start: START, once: true, onEnter: play });

		return () => {
			trigger?.kill();
			tween.kill();
			gsap.set(node, { clearProps: 'clipPath' });
		};
	};
}

/**
 * The logo at load, from the inside out, on 16's own 1.4 s. The three O's are crescents and wax
 * like a moon: each one's mask holds a shadow circle that starts over the whole ring (the ring's
 * own centre, a little wider than it) and moves to the cut-out's place while it shrinks, so the
 * thick side of the crescent shows first and the thin side last. The middle O starts first, the
 * outer two 0.3 s later; the M and the N rise out of a wipe from the bottom at 0.7 s, PILATES at
 * 1.0 s. The markup holds the resting state; GSAP sets every start.
 */
export function revealLogo(): Attachment<SVGElement> {
	return (node) => {
		if (prefersReducedMotion.current) return;

		const at: Record<string, number> = { o2: 0, o1: 0.3, o3: 0.3, m: 0.7, n: 0.7, pilates: 1 };
		const shadows = Array.from(node.querySelectorAll<SVGCircleElement>('[data-shadow]'));
		const wipes = Array.from(node.querySelectorAll<SVGGElement>('[data-part]')).filter(
			(part) => !shadows.some((shadow) => shadow.dataset.shadow === part.dataset.part)
		);
		const number = (el: Element, name: string) => Number(el.getAttribute(name));
		const rest = shadows.map((shadow) => ({
			cx: number(shadow, 'cx'),
			cy: number(shadow, 'cy'),
			r: number(shadow, 'r')
		}));

		for (const shadow of shadows) {
			gsap.set(shadow, {
				attr: {
					cx: number(shadow, 'data-cx'),
					cy: number(shadow, 'data-cy'),
					r: number(shadow, 'data-outer') + 4
				}
			});
		}
		gsap.set(wipes, { clipPath: 'inset(100% 0% 0% 0%)' });
		gsap.set(node, { visibility: 'visible' });

		const timeline = gsap.timeline({ delay: staggerDelay() });
		shadows.forEach((shadow, i) => {
			timeline.to(
				shadow,
				{ attr: rest[i], duration: WORD, ease: RISE },
				at[shadow.dataset.shadow ?? ''] ?? 0
			);
		});
		for (const part of wipes) {
			timeline.to(
				part,
				{ clipPath: 'inset(0% 0% 0% 0%)', duration: WORD, ease: RISE },
				at[part.dataset.part ?? ''] ?? 1
			);
		}

		return () => {
			timeline.kill();
			shadows.forEach((shadow, i) => gsap.set(shadow, { attr: rest[i] }));
			gsap.set(wipes, { clearProps: 'clipPath' });
		};
	};
}

/**
 * 01b as a full takeover — the one signature moment, as the library has it: a circle grows from
 * the bottom edge of its stage, `circle(0% at 50% 100%)` to `circle(150% at 50% 100%)`, scrubbed
 * from `top bottom` to `top top`, `ease: none`. Only the top half of the circle shows: a moon
 * rising over the edge, whole across the screen the moment the stage fills it. No pin, no scroll
 * lock; the band after the stage continues on the moon's colour.
 */
export function moonRise(): Attachment<HTMLElement> {
	return (stage) => {
		const moon = stage.querySelector<HTMLElement>('[data-moon]');
		if (!moon || prefersReducedMotion.current) return;

		// the moon is two screens tall (Moon.svelte), so it reaches over the section before it and the
		// dome is never cut flat; 120 % of that box rises and covers at the same moments as the
		// library's 150 % of one screen
		const tween = gsap.fromTo(
			moon,
			{ clipPath: 'circle(0% at 50% 100%)' },
			{
				clipPath: 'circle(120% at 50% 100%)',
				ease: 'none',
				scrollTrigger: { trigger: stage, start: 'top bottom', end: 'top top', scrub: true }
			}
		);
		gsap.set(moon, { visibility: 'visible' });

		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
			gsap.set(moon, { clearProps: 'clipPath' });
		};
	};
}
