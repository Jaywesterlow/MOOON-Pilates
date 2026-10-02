<script lang="ts">
	import { moonRise } from '$lib/motion/attachments';

	/**
	 * The signature moment (01b as a full takeover): a circle in MOOON's night colour rises and
	 * grows with the scroll until it fills the screen; the studio band that follows sits on that
	 * colour. The stage is taller than one screen: the first screen of it is the rise, the rest the
	 * fill-out to the corners (see `moonRise`). Built to take the O of their logo once that is an SVG.
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
		height: 160svh;
	}
	.moon {
		position: absolute;
		inset: 0;
		background: var(--night);
		clip-path: circle(0px at 50% 0px);
	}
	/* under reduced motion the circle is already full: the band simply starts here */
	@media (prefers-reduced-motion: reduce) {
		.stage {
			height: 40svh;
		}
		.moon {
			clip-path: none;
		}
	}
</style>
