<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { OpeningWords, Studio, UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import { opening } from '$lib/state/opening.svelte';
	import Button from './Button.svelte';
	import Logo from './Logo.svelte';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';

	/**
	 * One screen: the reformer room as the ground, the logo in the middle (the one centred thing
	 * on the page, by MOOON's own asset), and the rest on the margin at the bottom: the tagline,
	 * the booking button, the address and today's hours.
	 */
	type Props = { studio: Studio; text: UI['hero']; words: OpeningWords };
	let { studio, text, words }: Props = $props();
</script>

<header class="hero" id="top">
	<div class="ground">
		<enhanced:img
			src={photos.hero}
			alt={text.alt}
			sizes="100vw"
			loading="eager"
			fetchpriority="high"
		/>
	</div>

	<!-- I22/I23: a flat overlay for the logo over the whole photo, a scrim behind the text at the bottom -->
	<div class="mark">
		<Logo alt={studio.fullName} tone="light" eager sizes="(min-width: 900px) 36vw, 70vw" />
	</div>

	<div class="foot frame">
		<div class="copy">
			<Heading level="h1" lines={text.lines} />
			<Rise inline>
				<Button href={studio.booking.url} onclick={booking.open} variant="paper">
					{text.book}
				</Button>
			</Rise>
		</div>
		<Rise>
			<ul class="facts small">
				<li>
					<a class="link" href={studio.address.maps} target="_blank" rel="noopener">
						{studio.address.street}, {studio.address.city}
					</a>
				</li>
				<li class="numeric">{opening.headline(words)}</li>
			</ul>
		</Rise>
	</div>
</header>

<style>
	.hero {
		position: relative;
		display: grid;
		align-content: end;
		height: calc(100svh - var(--nav-h));
		min-height: 34rem;
		color: var(--paper-d);
		overflow: hidden;
	}
	.ground {
		position: absolute;
		inset: 0;
		background: var(--night);
	}
	.ground :global(picture) {
		display: contents;
	}
	.ground :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 55%;
	}
	/* the flat overlay (I22, large text: 42 % of black and up; here 50 % of their night) and
	   the eased scrim that rises behind the copy at the bottom (I23) */
	.ground::after {
		content: '';
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				to top,
				rgb(66 61 49 / 0.7) 0%,
				rgb(66 61 49 / 0.55) 12%,
				rgb(66 61 49 / 0.3) 26%,
				rgb(66 61 49 / 0.1) 38%,
				transparent 48%
			),
			rgb(66 61 49 / 0.5);
	}
	.mark {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		pointer-events: none;
	}
	.mark :global(.logo) {
		--logo-h: min(24svh, 12.4vw, 11rem);
	}
	.foot {
		position: relative;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-6);
		padding-bottom: var(--space-7);
	}
	.copy {
		display: grid;
		justify-items: start;
		gap: var(--space-5);
	}
	.hero :global(.display) {
		color: var(--paper-d);
	}
	.facts {
		display: grid;
		gap: var(--space-1);
		text-align: right;
		color: var(--muted-d);
	}
	.facts .link {
		color: var(--muted-d);
	}
	.facts .link:hover {
		color: var(--paper-d);
	}

	@media (max-width: 900px) {
		.mark :global(.logo) {
			--logo-h: min(20svh, 24vw);
		}
		.foot {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-5);
			padding-bottom: var(--space-6);
		}
		.facts {
			text-align: left;
		}
	}
</style>
