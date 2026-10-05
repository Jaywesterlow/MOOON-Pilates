<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { OpeningWords, Studio, UI } from '$lib/data/studio';
	import { demo } from '$lib/state/demo.svelte';
	import { opening } from '$lib/state/opening.svelte';
	import Button from './Button.svelte';
	import Logo from './Logo.svelte';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';
	import Roll from './Roll.svelte';

	/**
	 * One screen, the sector's hero: the reformer room as the ground, edge to edge, and on the
	 * axis the logo, the tagline and the one booking button (GA19). The address and today's hours
	 * sit in the two bottom corners on the margin, the one line of metadata a full-bleed band may
	 * carry (GF06).
	 */
	type Props = { studio: Studio; text: UI['hero']; words: OpeningWords };
	let { studio, text, words }: Props = $props();
</script>

<header class="hero" id="top">
	<div class="ground photo">
		<enhanced:img
			src={photos.hero}
			alt={text.alt}
			sizes="100vw"
			loading="eager"
			fetchpriority="high"
		/>
	</div>

	<div class="stack">
		<div class="mark">
			<Logo alt={studio.fullName} reveal />
		</div>
		<Heading level="h1" lines={text.lines} centred />
		<Rise inline>
			<Button href={studio.booking.url} onclick={demo.book}>{text.book}</Button>
		</Rise>
	</div>

	<div class="corners frame small">
		<Rise>
			<a class="link" href={studio.address.maps} onclick={demo.open} target="_blank" rel="noopener">
				<Roll>{studio.address.street}, {studio.address.city}</Roll>
			</a>
		</Rise>
		<Rise><span class="numeric">{opening.headline(words)}</span></Rise>
	</div>
</header>

<style>
	.hero {
		position: relative;
		display: grid;
		grid-template-rows: 1fr auto;
		height: 100svh;
		min-height: 36rem;
		color: var(--paper);
		overflow: hidden;
	}
	.ground {
		position: absolute;
		inset: 0;
		background: var(--night);
	}
	.ground :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 55%;
	}
	/* I22: a flat overlay of their night at 50 % for the logo and the large tagline */
	.ground::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgb(66 61 49 / 0.5);
	}
	/* GA14: logo to heading 24, heading to button 32; the stack sits a little above the middle */
	.stack {
		position: relative;
		display: grid;
		justify-items: center;
		align-content: center;
		gap: var(--space-5);
		padding: var(--nav-h) var(--margin) 0;
		text-align: center;
	}
	.stack > :last-child {
		margin-top: var(--space-2);
	}
	.mark :global(.logo) {
		--logo-h: min(20svh, 11vw, 9.5rem);
	}
	.corners {
		position: relative;
		display: flex;
		justify-content: space-between;
		gap: var(--space-5);
		padding-bottom: var(--space-6);
		color: var(--muted);
	}
	.corners .link {
		color: var(--muted);
	}
	.corners .link:hover {
		color: var(--paper);
	}
	@media (max-width: 900px) {
		.mark :global(.logo) {
			--logo-h: min(16svh, 22vw);
		}
		.corners {
			flex-direction: column;
			gap: var(--space-1);
			padding-bottom: var(--space-5);
		}
	}
</style>
