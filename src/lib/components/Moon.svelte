<script lang="ts">
	import { moonRise } from '$lib/motion/attachments';

	/**
	 * The signature moment (01b as a full takeover, as the library has it): a circle in MOOON's cream
	 * grows from the bottom edge of this one-screen stage while it scrolls in, so only its top half
	 * shows, a moon rising, and covers the screen the moment the stage fills it; the light band that
	 * follows (the first class, the prices) sits on that colour.
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
		height: 100svh;
	}
	.moon {
		position: absolute;
		inset: 0;
		background: var(--paper);
		clip-path: circle(0% at 50% 100%);
	}
	/* under reduced motion the circle is already full: the light band simply starts here */
	@media (prefers-reduced-motion: reduce) {
		.stage {
			height: 40svh;
		}
		.moon {
			clip-path: none;
		}
	}
</style>
