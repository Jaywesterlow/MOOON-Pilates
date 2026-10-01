<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { OpeningWords, Studio, UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import { opening } from '$lib/state/opening.svelte';
	import Button from './Button.svelte';
	import Logo from './Logo.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { studio: Studio; text: UI['hero']; words: OpeningWords };
	let { studio, text, words }: Props = $props();
</script>

<header class="hero" id="top">
	<div class="text">
		<!-- the logo is MOOON's strongest asset: here it is the first thing you see, at full size -->
		<div class="mark">
			<Logo alt={studio.fullName} eager sizes="(min-width: 900px) 30rem, 100vw" />
		</div>
		<RevealHeading level="h1" on="load" lines={text.lines} />
		<p class="lede">{text.lede}</p>
		<div class="cta">
			<Button href={studio.booking.url} onclick={booking.open} size="lg" magnetic>
				{text.book}
			</Button>
		</div>
		<ul class="facts small">
			<li>
				<a class="ul tap" href={studio.address.maps} target="_blank" rel="noopener">
					{studio.address.street}, {studio.address.city}
				</a>
			</li>
			<li class="open numeric">{opening.headline(words)}</li>
		</ul>
	</div>

	<div class="photo media">
		<enhanced:img
			src={photos.hero}
			alt={text.alt}
			sizes="(min-width: 900px) 50vw, 100vw"
			fetchpriority="high"
		/>
	</div>
</header>

<style>
	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		min-height: 100vh;
		min-height: 100svh;
	}
	.text {
		--logo-h: auto;

		display: grid;
		align-content: center;
		justify-items: start;
		gap: var(--space-5);
		/* the left edge lines up with every .wrap below */
		padding: calc(var(--nav-h) + var(--space-7)) var(--space-8) var(--space-7)
			max(var(--gutter), calc((100vw - var(--max)) / 2 + var(--gutter)));
	}
	.mark {
		width: min(100%, 30rem);
		margin-bottom: var(--space-5);
	}
	.mark :global(img) {
		width: 100%;
	}
	.lede {
		max-width: 24em;
	}
	.cta {
		margin-top: var(--space-2);
	}
	.facts {
		display: grid;
		gap: var(--space-1);
		margin-top: var(--space-3);
	}
	.open {
		color: var(--ink);
	}
	.media {
		min-height: 100%;
	}

	@media (max-width: 900px) {
		.hero {
			grid-template-columns: minmax(0, 1fr);
			min-height: 0;
		}
		.text {
			padding: calc(var(--nav-h) + var(--space-6)) var(--gutter) var(--space-7);
		}
		.mark {
			width: 100%;
		}
		.media {
			aspect-ratio: 4 / 5;
		}
	}
</style>
