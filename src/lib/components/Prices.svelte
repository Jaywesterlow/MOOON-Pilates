<script lang="ts">
	import { euro, type Locale, type Price, type Studio, type UI } from '$lib/data/studio';
	import { demo } from '$lib/state/demo.svelte';
	import Button from './Button.svelte';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';

	/** On the moon's colour: the trial class highlighted with the one device, a night block (A51); the rest as rows. */
	type Props = { studio: Studio; prices: Price[]; text: UI['prices']; locale: Locale };
	let { studio, prices, text, locale }: Props = $props();

	const featured = $derived(prices.find((price) => price.featured));
	const rest = $derived(prices.filter((price) => !price.featured));
</script>

<section class="section frame light prices" id="prices">
	<div class="head">
		<Rise><p class="label">{text.label}</p></Rise>
		<Heading lines={text.lines} />
		<Rise><p class="lede">{text.lede}</p></Rise>
	</div>

	<div class="split">
		{#if featured}
			<div class="featured">
				<Rise>
					<h3>{featured.name}</h3>
					<p class="amount numeric">{euro(featured.amount, locale)}</p>
					<p class="detail">{featured.detail}</p>
				</Rise>
				<Rise inline>
					<Button href={studio.booking.url} onclick={demo.book}>{text.book}</Button>
				</Rise>
			</div>
		{/if}

		<ul class="list rows">
			{#each rest as price (price.id)}
				<li>
					<Rise>
						<div class="row">
							<div>
								<h3>{price.name}</h3>
								<p class="small">
									{price.detail}
									{#if price.perClass}
										<span class="numeric nowrap"
											>{euro(price.perClass, locale)} {text.perClass}.</span
										>
									{/if}
								</p>
							</div>
							<p class="amount numeric">
								{euro(price.amount, locale)}{#if price.period}<span class="period">
										{price.period}</span
									>{/if}
							</p>
						</div>
					</Rise>
				</li>
			{/each}
		</ul>
	</div>

	<Rise><p class="small note">{text.note}</p></Rise>
</section>

<style>
	.split {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: var(--space-8);
		align-items: start;
	}
	.featured {
		display: grid;
		gap: var(--space-5);
		justify-items: start;
		padding: var(--space-6);
		border-radius: var(--r);
		background: var(--night);
		color: var(--muted);
	}
	.featured h3,
	.featured .amount {
		color: var(--paper);
	}
	.featured h3 {
		margin-bottom: var(--space-3);
	}
	.featured .detail {
		margin-top: var(--space-3);
	}
	.amount {
		font-family: var(--font-display);
		font-size: var(--text-price);
		line-height: 1;
		color: var(--night);
		white-space: nowrap;
	}
	/* T43: the period at half the price size */
	.period {
		font-family: var(--font-body);
		font-size: var(--text-body);
		color: var(--ink-2);
		margin-left: var(--space-2);
	}
	.row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: var(--space-5);
		align-items: baseline;
		padding-block: var(--space-5);
	}
	.row h3 {
		margin-bottom: var(--space-1);
	}
	.nowrap {
		white-space: nowrap;
	}
	.note {
		margin-top: var(--space-6);
	}
	@media (max-width: 900px) {
		.split {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-6);
		}
		.featured {
			padding: var(--space-5);
		}
	}
</style>
