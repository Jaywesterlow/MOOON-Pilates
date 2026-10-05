<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import { euro, type Locale, type Price, type Studio, type UI } from '$lib/data/studio';
	import { demo } from '$lib/state/demo.svelte';
	import Button from './Button.svelte';
	import Heading from './Heading.svelte';
	import Photo from './Photo.svelte';
	import Rise from './Rise.svelte';

	/**
	 * The sector's closing: an image card inset in the frame, the front door of the studio under a
	 * centred stack (GA20): the trial class, its one line, its price, the button. The third and last
	 * centred section of the page.
	 */
	type Props = { studio: Studio; price: Price; text: UI['closing']; alt: string; locale: Locale };
	let { studio, price, text, alt, locale }: Props = $props();
</script>

<section class="frame sparse closing" id="book">
	<div class="card">
		<Photo src={photos.visit} {alt} sizes="100vw" ratio="fill" position="50% 60%" />
		<div class="stack">
			<Rise><p class="label">{text.label}, {euro(price.amount, locale)}</p></Rise>
			<Heading lines={[price.name]} centred />
			<Rise><p class="lede">{price.detail}</p></Rise>
			<Rise inline>
				<Button href={studio.booking.url} onclick={demo.book}>{text.book}</Button>
			</Rise>
		</div>
	</div>
</section>

<style>
	.closing {
		padding-top: 0;
	}
	.card {
		position: relative;
		isolation: isolate;
		display: grid;
		place-items: center;
		min-height: min(70svh, 40rem);
		padding: var(--space-8) var(--space-6);
		border-radius: var(--r);
		overflow: hidden;
		background: var(--olive);
		color: var(--paper);
		text-align: center;
	}
	/* I22: small text on the photo, so the flat overlay goes to 55 % */
	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		background: rgb(66 61 49 / 0.55);
	}
	/* GA14: label to heading 12, heading to line 16, line to button 32 */
	.stack {
		position: relative;
		z-index: 2;
		display: grid;
		justify-items: center;
		gap: var(--space-4);
		max-width: 38rem;
	}
	.stack .label {
		margin-bottom: calc(var(--space-1) * -1);
	}
	.stack > :last-child {
		margin-top: var(--space-4);
	}
	.lede {
		color: var(--muted);
	}
	@media (max-width: 900px) {
		.card {
			padding: var(--space-7) var(--space-5);
		}
	}
</style>
