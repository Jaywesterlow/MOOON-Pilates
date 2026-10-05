<script lang="ts">
	import { moonRise } from '$lib/motion/attachments';

	/**
	 * The signature moment (01b, as the library has it): a circle in MOOON's cream grows from the
	 * bottom edge of this one-screen stage while it scrolls in, so only its top half shows, a moon
	 * rising, and covers the screen the moment the stage fills it; the light band that follows (the
	 * first class, the prices) sits on that colour. The moon itself is two screens tall and lies
	 * over the section before it, so the dome rises over that section instead of being cut flat by
	 * the stage's top edge.
	 */
	type Props = { label: string };
	let { label }: Props = $props();
</script>

<div class="stage" role="img" aria-label={label} {@attach moonRise()}>
	<div class="moon" data-moon data-reveal="moon"></div>
</div>

<style>
	.stage {
		position: relative;
		z-index: 1;
		height: 100svh;
	}
	.moon {
		position: absolute;
		inset: auto 0 0 0;
		height: 200svh;
		background: var(--paper);
		clip-path: circle(0% at 50% 100%);
		pointer-events: none;
	}
	/* under reduced motion the circle is already full: the light band simply starts here */
	@media (prefers-reduced-motion: reduce) {
		.stage {
			height: 40svh;
		}
		.moon {
			inset: 0;
			height: auto;
			clip-path: none;
		}
	}
</style>
