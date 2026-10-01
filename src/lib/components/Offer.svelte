<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { Offer, UI } from '$lib/data/studio';
	import Arrow from './Arrow.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { items: Offer[]; text: UI['offer'] };
	let { items, text }: Props = $props();
</script>

<section class="section offer" id="offer">
	<div class="wrap">
		<div class="head">
			<RevealHeading lines={text.lines} />
			<p class="lede">{text.lede}</p>
		</div>

		<ul class="items">
			{#each items as item (item.href)}
				<li>
					<a class="item" href={item.href} target="_blank" rel="noopener">
						<div class="photo frame">
							<enhanced:img
								src={photos[item.photo]}
								alt={item.alt}
								sizes="(min-width: 900px) 20vw, 30vw"
								loading="lazy"
							/>
						</div>
						<div class="body">
							<h3>{item.title}</h3>
							<p class="small">{item.line}</p>
							<span class="more label">{text.more} <Arrow /></span>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.items {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: var(--space-5);
	}
	.item {
		display: grid;
		gap: var(--space-4);
		align-content: start;
		height: 100%;
	}
	.frame {
		aspect-ratio: 3 / 4;
	}
	.body {
		display: grid;
		gap: var(--space-2);
		align-content: start;
	}
	.more {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		min-height: var(--tap);
		color: var(--night);
	}
	.item:hover .more :global(svg) {
		transform: translateX(4px);
	}
	@media (max-width: 900px) {
		.items {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-5);
		}
		/* a phone gets rows: a small photo, the words beside it */
		.item {
			grid-template-columns: 6rem minmax(0, 1fr);
			gap: var(--space-4);
			align-items: start;
		}
		.more {
			min-height: var(--tap);
		}
	}
</style>
