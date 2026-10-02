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

/** Where a reveal starts: as the top of the element passes 94% of the screen (so the bottom of the first screen plays at load). */
const START = 'top 94%';
/** The duration for the rises and wipes outside the display headings: the expressive family's upper bound. */
const DURATION = 0.7;
/** 16's own step between lines. */
const STEP = 0.1;

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

		const trigger = ScrollTrigger.create({
			trigger: node,
			start: START,
			once: true,
			onEnter: () => timeline.delay(staggerDelay()).play()
		});

		return () => {
			trigger.kill();
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

		const tween = gsap.to(node, { yPercent: 0, duration: DURATION, ease: RISE, paused: true });
		const trigger = ScrollTrigger.create({
			trigger: node.parentElement ?? node,
			start: START,
			once: true,
			onEnter: () => tween.delay(staggerDelay()).play()
		});

		return () => {
			trigger.kill();
			tween.kill();
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
		const trigger = ScrollTrigger.create({
			trigger: node,
			start: START,
			once: true,
			onEnter: () => tween.delay(staggerDelay()).play()
		});

		return () => {
			trigger.kill();
			tween.kill();
			gsap.set(node, { clearProps: 'clipPath' });
		};
	};
}

/**
 * 01b as a full takeover — the one signature moment. A circle in MOOON's night colour grows
 * with the scroll, `ease: none`, no pin, no scroll lock, until it fills the screen; the band
 * after it continues on the same colour.
 *
 * The library's circle keeps its centre on the bottom edge, so its top half is always cut off.
 * Here the circle is whole at every frame and every viewport: while the stage scrolls in, the
 * circle sits in the middle of the part of the stage that is on screen, its radius half of
 * that part's height (never more than half the screen's width), so its bottom rides the bottom
 * edge and nothing is clipped: a full moon rising. Once the stage's top reaches the top of the
 * screen the circle stays in the middle of the screen and grows on to the corners. The stage
 * is taller than the screen; that extra height is the scroll in which it fills out.
 */
export function moonRise(): Attachment<HTMLElement> {
	return (stage) => {
		const moon = stage.querySelector<HTMLElement>('[data-moon]');
		if (!moon || prefersReducedMotion.current) return;

		const paint = (progress: number) => {
			const vh = window.innerHeight;
			const vw = window.innerWidth;
			const height = stage.offsetHeight;
			const travelled = progress * height;

			let radius: number;
			let centre: number;
			if (travelled <= vh) {
				// rising: inscribed in the visible part of the stage, bottom on the bottom edge
				centre = travelled / 2;
				radius = Math.min(travelled / 2, vw / 2);
			} else {
				// filling: centred on the screen, growing to the corners
				const extra = height - vh;
				const fill = extra > 0 ? (travelled - vh) / extra : 1;
				const whole = Math.min(vh, vw) / 2;
				const corner = Math.hypot(vw, vh) / 2 + 1;
				centre = travelled - vh / 2;
				radius = whole + fill * (corner - whole);
			}
			moon.style.clipPath = `circle(${radius.toFixed(1)}px at 50% ${centre.toFixed(1)}px)`;
		};

		const trigger = ScrollTrigger.create({
			trigger: stage,
			start: 'top bottom',
			end: 'bottom bottom',
			scrub: true,
			onUpdate: (self) => paint(self.progress),
			onRefresh: (self) => paint(self.progress)
		});
		paint(trigger.progress);
		gsap.set(moon, { visibility: 'visible' });

		return () => {
			trigger.kill();
			moon.style.clipPath = '';
		};
	};
}
