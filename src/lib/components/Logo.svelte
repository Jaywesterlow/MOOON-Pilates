<script lang="ts">
	import { logoBox, logoParts, logoRings } from '$lib/assets/logo-parts';
	import { revealLogo } from '$lib/motion/attachments';

	/**
	 * MOOON's logo as inline SVG in six parts (M, the three O's, N, PILATES), traced from their
	 * PNG. Fill is currentColor, so it is white on the night and black on the cream; never
	 * recoloured otherwise, never cropped. Height from --logo-h.
	 *
	 * With `reveal` (the hero), the parts arrive one by one at load. The O's are crescents, each
	 * a circle with a smaller circle cut out off centre, so each waxes like a moon: a shadow circle
	 * in its mask starts over the whole ring and moves to the cut-out's place, the thick side
	 * first. The middle O goes first, then the outer two, then the M and the N rise out of a wipe,
	 * then PILATES.
	 */
	type Props = { alt: string; reveal?: boolean };
	let { alt, reveal = false }: Props = $props();

	const uid = $props.id();
	const [, , width, height] = logoBox.split(' ');
	const ringOf = (id: string) => logoRings.find((ring) => ring.id === id);
</script>

<svg
	class="logo"
	viewBox={logoBox}
	role="img"
	aria-label={alt}
	data-reveal={reveal ? 'logo' : undefined}
	{@attach reveal && revealLogo()}
>
	{#if reveal}
		<defs>
			{#each logoRings as ring (ring.id)}
				<!-- the markup holds the resting state (the shadow inside the cut-out); GSAP sets the start -->
				<mask id="{uid}-{ring.id}" maskUnits="userSpaceOnUse" x="0" y="0" {width} {height}>
					<rect {width} {height} fill="#fff" />
					<circle
						data-shadow={ring.id}
						data-cx={ring.cx}
						data-cy={ring.cy}
						data-outer={ring.R}
						cx={ring.ix}
						cy={ring.iy}
						r={ring.r - 4}
						fill="#000"
					/>
				</mask>
			{/each}
		</defs>
	{/if}
	{#each logoParts as part (part.id)}
		<g data-part={part.id} mask={reveal && ringOf(part.id) ? `url(#${uid}-${part.id})` : undefined}>
			<path d={part.d} fill="currentColor" fill-rule="evenodd" />
		</g>
	{/each}
</svg>

<style>
	.logo {
		display: block;
		height: var(--logo-h, 2.5rem);
		width: auto;
		aspect-ratio: 2350 / 810;
		overflow: visible;
	}
</style>
