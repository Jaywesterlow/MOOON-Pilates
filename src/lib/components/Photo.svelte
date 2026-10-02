<script lang="ts">
	import type { Picture } from 'vite-imagetools';
	import { wipe } from '$lib/motion/attachments';

	/** A photo through <enhanced:img>, square-edged, opening with a wipe from the bottom when it enters. */
	type Props = {
		src: Picture;
		alt: string;
		sizes: string;
		eager?: boolean;
		/** CSS aspect-ratio, e.g. "4 / 5"; "fill" fills the parent; none leaves the size to the parent's CSS */
		ratio?: string;
		position?: string;
	};
	let { src, alt, sizes, eager = false, ratio, position = '50% 50%' }: Props = $props();
</script>

<div
	class={['photo', { fill: ratio === 'fill' }]}
	style:aspect-ratio={ratio === 'fill' ? undefined : ratio}
	style:--position={position}
	data-reveal="wipe"
	{@attach wipe()}
>
	<enhanced:img
		{src}
		{alt}
		{sizes}
		loading={eager ? 'eager' : 'lazy'}
		fetchpriority={eager ? 'high' : undefined}
	/>
</div>

<style>
	.photo {
		position: relative;
		overflow: hidden;
		background: var(--panel);
	}
	.fill {
		position: absolute;
		inset: 0;
	}
	.photo :global(picture) {
		display: contents;
	}
	.photo :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: var(--position);
	}
</style>
