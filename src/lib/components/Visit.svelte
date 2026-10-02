<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { OpeningWords, Studio, UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import { opening } from '$lib/state/opening.svelte';
	import Button from './Button.svelte';
	import Heading from './Heading.svelte';
	import Photo from './Photo.svelte';
	import Rise from './Rise.svelte';

	type Props = { studio: Studio; text: UI['visit']; words: OpeningWords };
	let { studio, text, words }: Props = $props();
</script>

<section class="visit" id="visit">
	<div class="section frame">
		<div class="head">
			<Heading lines={text.lines} />
		</div>

		<div class="cols">
			<div class="col">
				<Rise>
					<h3 class="label">{text.find}</h3>
					<p>
						{studio.fullName}<br />
						{studio.address.street}<br />
						{studio.address.postalCode}
						{studio.address.city}
					</p>
					<a class="link tap" href={studio.address.maps} target="_blank" rel="noopener">
						{text.route}
					</a>
				</Rise>
			</div>

			<div class="col">
				<Rise>
					<h3 class="label">{text.hours}</h3>
					{#each studio.hours as block (block.opens)}
						<p>
							{studio.hoursLabel}<br />
							<span class="numeric">{block.opens} – {block.closes}</span>
						</p>
					{/each}
					<p class="small numeric">{opening.headline(words)}</p>
				</Rise>
			</div>

			<div class="col">
				<Rise>
					<h3 class="label">{text.contact}</h3>
					<a class="link tap" href={studio.whatsapp.href} target="_blank" rel="noopener">
						{text.whatsapp}
						{studio.whatsapp.display}
					</a>
					<br />
					<a class="link tap" href="mailto:{studio.email}">{studio.email}</a>
				</Rise>
			</div>
		</div>

		<div class="cta">
			<Rise inline>
				<Button href={studio.booking.url} onclick={booking.open}>{text.book}</Button>
			</Rise>
		</div>
	</div>

	<!-- B06: the page's last break mirrors the hero's: the front door, edge to edge -->
	<div class="front">
		<Photo src={photos.visit} alt={text.alt} sizes="100vw" position="50% 60%" />
	</div>
</section>

<style>
	.cols {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-6);
	}
	.col {
		border-top: 1px solid var(--line);
		padding-top: var(--space-4);
	}
	.col h3 {
		font-family: var(--font-body);
		color: var(--ink-2);
		margin-bottom: var(--space-3);
	}
	.col p + p {
		margin-top: var(--space-2);
	}
	.cta {
		margin-top: var(--space-7);
	}
	/* edge to edge; the height follows the width until the screen's height caps it */
	.front :global(.photo) {
		width: 100%;
		height: min(80svh, 56.25vw);
	}
	@media (max-width: 900px) {
		.cols {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
