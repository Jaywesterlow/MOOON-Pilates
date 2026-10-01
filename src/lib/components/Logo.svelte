<script lang="ts">
	import black from '$lib/assets/logo-black.png?enhanced';
	import white from '$lib/assets/logo-white.png?enhanced';

	/** MOOON's own wordmark (2350 × 810 PNG from their media library). Height from --logo-h. */
	type Props = {
		alt: string;
		tone?: 'dark' | 'light';
		eager?: boolean;
		/** the rendered width, for the srcset: small in the nav, large in the hero and footer */
		sizes?: string;
	};
	let { alt, tone = 'dark', eager = false, sizes = '10rem' }: Props = $props();
</script>

<!-- one branch per file: <enhanced:img> needs a plain import as its src, not an expression -->
{#if tone === 'dark'}
	<enhanced:img class="logo" src={black} {alt} {sizes} loading={eager ? 'eager' : 'lazy'} />
{:else}
	<enhanced:img class="logo" src={white} {alt} {sizes} loading={eager ? 'eager' : 'lazy'} />
{/if}

<style>
	.logo {
		display: block;
		height: var(--logo-h, 2.5rem);
		width: auto;
	}
</style>
