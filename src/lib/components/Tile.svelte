<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Picture } from 'vite-imagetools';
	import Photo from './Photo.svelte';

	/**
	 * The sector's card: a 3:4 photo tile with the words bottom-left on an eased scrim (I23).
	 * As a link it takes the page's hover: a night fill rises from the bottom and leaves through
	 * the top. The words stay cream on both.
	 */
	type Props = {
		src: Picture;
		alt: string;
		sizes: string;
		href?: string;
		position?: string;
		children?: Snippet;
	};
	let { src, alt, sizes, href, position = '50% 50%', children }: Props = $props();
</script>

{#if href}
	<a class="tile" {href} target="_blank" rel="noopener">
		<Photo {src} {alt} {sizes} {position} ratio="3 / 4" />
		<span class="fill" aria-hidden="true"></span>
		{#if children}<span class="words">{@render children()}</span>{/if}
	</a>
{:else}
	<div class="tile">
		<Photo {src} {alt} {sizes} {position} ratio="3 / 4" />
		{#if children}<span class="words">{@render children()}</span>{/if}
	</div>
{/if}

<style>
	.tile {
		position: relative;
		display: block;
		isolation: isolate;
		overflow: hidden;
		border-radius: var(--r);
		background: var(--olive);
		color: var(--paper);
	}
	.tile :global(.photo) {
		border-radius: 0;
	}
	/* I23: a scrim rising behind the words, 70 % at the edge, gone at twice the block's depth */
	.words {
		position: absolute;
		inset: auto 0 0 0;
		display: grid;
		justify-items: start;
		gap: var(--space-1);
		padding: 45% var(--space-5) var(--space-5);
		background: linear-gradient(
			to top,
			rgb(66 61 49 / 0.7) 0%,
			rgb(66 61 49 / 0.55) 25%,
			rgb(66 61 49 / 0.3) 50%,
			rgb(66 61 49 / 0.1) 75%,
			transparent 100%
		);
	}
	/* the same fill as the buttons: in from the bottom, out through the top */
	.fill {
		position: absolute;
		inset: 0;
		background: rgb(66 61 49 / 0.55);
		clip-path: inset(0 0 100% 0);
		transition: clip-path 0.38s var(--ease-rise);
	}
	.tile:hover .fill,
	.tile:focus-visible .fill {
		clip-path: inset(0 0 0 0);
		animation: fill-in 0.38s var(--ease-rise);
	}
	@keyframes fill-in {
		from {
			clip-path: inset(100% 0 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}
</style>
