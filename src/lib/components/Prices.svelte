<script lang="ts">
	import { euro, type Locale, type Price, type Studio, type UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import Button from './Button.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { studio: Studio; prices: Price[]; text: UI['prices']; locale: Locale };
	let { studio, prices, text, locale }: Props = $props();

	const featured = $derived(prices.find((price) => price.featured));
	const rest = $derived(prices.filter((price) => !price.featured));
</script>

<section class="section prices" id="prices">
	<div class="wrap">
		<div class="head">
			<RevealHeading lines={text.lines} />
			<p class="lede">{text.lede}</p>
		</div>

		<div class="grid">
			{#if featured}
				<!-- the trial class is the one price that matters: it carries the button -->
				<div class="featured">
					<h3>{featured.name}</h3>
					<p class="amount numeric">{euro(featured.amount, locale)}</p>
					<p>{featured.detail}</p>
					<Button href={studio.booking.url} onclick={booking.open} variant="paper" magnetic>
						{text.book}
					</Button>
				</div>
			{/if}

			<ul class="list">
				{#each rest as price (price.id)}
					<li>
						<div>
							<h3>{price.name}</h3>
							<p class="small">
								{price.detail}
								{#if price.perClass}
									<span class="numeric nowrap">{euro(price.perClass, locale)} {text.perClass}.</span
									>
								{/if}
							</p>
						</div>
						<p class="amount numeric">
							{euro(price.amount, locale)}{#if price.period}<span class="period">
									{price.period}</span
								>{/if}
						</p>
					</li>
				{/each}
			</ul>
		</div>

		<p class="small note">{text.note}</p>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: var(--space-8);
		align-items: start;
	}
	.featured {
		display: grid;
		gap: var(--space-4);
		justify-items: start;
		padding: var(--space-6);
		background: var(--night-gradient);
		color: var(--muted-d);
	}
	.featured h3 {
		color: var(--paper-d);
	}
	.featured .amount {
		color: var(--paper-d);
	}
	.featured :global(.btn) {
		margin-top: var(--space-2);
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
	.list li {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: var(--space-5);
		align-items: baseline;
		padding-block: var(--space-5);
		border-top: 1px solid var(--line);
	}
	.list li:last-child {
		border-bottom: 1px solid var(--line);
	}
	.list div {
		display: grid;
		gap: var(--space-1);
	}
	.nowrap {
		white-space: nowrap;
	}
	.note {
		margin-top: var(--space-6);
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-6);
		}
		.featured {
			padding: var(--space-5);
		}
	}
</style>
