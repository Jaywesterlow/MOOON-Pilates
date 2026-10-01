<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { OpeningWords, Studio, UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import { opening } from '$lib/state/opening.svelte';
	import Button from './Button.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { studio: Studio; text: UI['visit']; words: OpeningWords };
	let { studio, text, words }: Props = $props();
</script>

<section class="visit" id="visit">
	<div class="wrap section">
		<div class="head">
			<RevealHeading lines={text.lines} />
		</div>

		<div class="cols">
			<div class="col">
				<h3 class="label">{text.find}</h3>
				<p>
					{studio.fullName}<br />
					{studio.address.street}<br />
					{studio.address.postalCode}
					{studio.address.city}
				</p>
				<a class="ul tap label" href={studio.address.maps} target="_blank" rel="noopener">
					{text.route}
				</a>
			</div>

			<div class="col">
				<h3 class="label">{text.hours}</h3>
				{#each studio.hours as block (block.opens)}
					<p>
						{studio.hoursLabel}<br />
						<span class="numeric">{block.opens} – {block.closes}</span>
					</p>
				{/each}
				<p class="small numeric">{opening.headline(words)}</p>
			</div>

			<div class="col contact">
				<h3 class="label">{text.contact}</h3>
				<a class="ul tap" href={studio.whatsapp.href} target="_blank" rel="noopener">
					<span>{text.whatsapp} {studio.whatsapp.display}</span>
				</a>
				<a class="ul tap" href="mailto:{studio.email}">{studio.email}</a>
			</div>
		</div>

		<div class="cta">
			<Button href={studio.booking.url} onclick={booking.open} size="lg" magnetic>
				{text.book}
			</Button>
		</div>
	</div>

	<!-- the one full bleed at the end of the page: the front door -->
	<div class="photo front">
		<enhanced:img src={photos.visit} alt={text.alt} sizes="100vw" loading="lazy" />
	</div>
</section>

<style>
	.cols {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-6);
	}
	.col {
		display: grid;
		gap: var(--space-3);
		align-content: start;
		justify-items: start;
		border-top: 1px solid var(--line);
		padding-top: var(--space-4);
	}
	.col h3 {
		font-family: var(--font-body);
		color: var(--ink-2);
	}
	.cta {
		margin-top: var(--space-7);
	}
	.front {
		aspect-ratio: 16 / 9;
		max-height: 80svh;
		width: 100%;
	}
	@media (max-width: 900px) {
		.cols {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-6);
		}
		.front {
			aspect-ratio: 4 / 3;
		}
	}
</style>
