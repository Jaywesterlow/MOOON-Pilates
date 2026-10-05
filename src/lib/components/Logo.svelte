<script lang="ts">
	import { logoBox, logoParts } from '$lib/assets/logo-parts';
	import { revealLogo } from '$lib/motion/attachments';

	/**
	 * MOOON's logo as inline SVG in six parts (M, the three O's, N, PILATES), traced from their
	 * PNG. Fill is currentColor, so it is white on the night and black on the cream; never
	 * recoloured otherwise, never cropped. Height from --logo-h.
	 *
	 * With `reveal`, the parts come up one by one from a mask at load (the hero): the middle O
	 * first, then the outer O's, then the M and the N, then PILATES.
	 */
	type Props = { alt: string; reveal?: boolean };
	let { alt, reveal = false }: Props = $props();
</script>

<svg
	class="logo"
	viewBox={logoBox}
	role="img"
	aria-label={alt}
	data-reveal={reveal ? 'logo' : undefined}
	{@attach reveal && revealLogo()}
>
	{#each logoParts as part (part.id)}
		<g data-part={part.id}>
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
