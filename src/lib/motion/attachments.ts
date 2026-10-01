import type { Attachment } from 'svelte/attachments';
import { prefersReducedMotion } from 'svelte/motion';
import { gsap, ScrollTrigger } from './scroll';

/**
 * Motion as Svelte attachments: `{@attach revealLines()}` on the element that moves.
 * Each one reads `prefersReducedMotion.current`, so it re-runs when the visitor flips the
 * setting, and each returns a cleanup that leaves the element in its resting state.
 *
 * Two of the page's three kinds of movement live here: 11b (headings) and 01b (the moon).
 * The third, 27c, is the magnetic button in `Button.svelte`. Timings are the library's and are
 * not tuned here. GSAP alone sets the start state: a CSS transform on the same element would
 * be added on top of it and leave a heading stuck below its mask.
 *
 * Pre-state: until GSAP has run, `html.js [data-reveal]` is `visibility: hidden` (app.css), so
 * nothing flashes before hydration. Each attachment sets its start state and then
 * `visibility: visible` inline in the same frame: from then on GSAP owns the element.
 */

/**
 * 11b — lines slide up softly from their mask: 110 % → 0, 1.2 s expo-out, 80 ms stagger,
 * at `top 85%`. As in the library, the heading resets only once it is below the screen again,
 * so scrolling back up never shows it leaving.
 */
export function revealLines(): Attachment<HTMLElement> {
	return (node) => {
		if (prefersReducedMotion.current) return;

		const lines = node.querySelectorAll<HTMLElement>('.line > span');
		gsap.set(lines, { yPercent: 110 });
		gsap.set(node, { visibility: 'visible' });

		const tween = gsap.to(lines, {
			yPercent: 0,
			duration: 1.2,
			ease: 'expo.out',
			stagger: 0.08,
			paused: true
		});
		const play = ScrollTrigger.create({
			trigger: node,
			start: 'top 85%',
			onEnter: () => tween.play()
		});
		const reset = ScrollTrigger.create({
			trigger: node,
			start: 'top bottom',
			onLeaveBack: () => tween.pause(0)
		});

		return () => {
			play.kill();
			reset.kill();
			tween.kill();
			gsap.set(lines, { clearProps: 'transform' });
		};
	};
}

/**
 * 01b — a circle opens a photo, scrubbed to the scroll of its own stage: from 0 at the bottom
 * edge, `ease: 'none'`, from `top bottom` to `top top`. Fully open when the stage fills the screen.
 *
 * One change to the library, on purpose: there the circle's centre stays on the bottom edge, so
 * the top half of the circle is always cut off. Here the disc is a square and the circle rises
 * while it grows: its bottom stays on the bottom edge and its radius is always half its height,
 * so the whole circle is visible at every frame and at every viewport. The moon rises.
 * (For a square, `circle()` percentages are of the side, so 50 % is the inscribed circle.)
 */
export function moonRise(): Attachment<HTMLElement> {
	return (stage) => {
		const disc = stage.querySelector<HTMLElement>('[data-moon]');
		if (!disc || prefersReducedMotion.current) return;

		const tween = gsap.fromTo(
			disc,
			{ clipPath: 'circle(0% at 50% 100%)' },
			{
				clipPath: 'circle(50% at 50% 50%)',
				ease: 'none',
				scrollTrigger: { trigger: stage, start: 'top bottom', end: 'top top', scrub: true }
			}
		);
		gsap.set(disc, { visibility: 'visible' });

		return () => {
			tween.scrollTrigger?.kill();
			tween.kill();
			gsap.set(disc, { clearProps: 'clipPath' });
		};
	};
}
