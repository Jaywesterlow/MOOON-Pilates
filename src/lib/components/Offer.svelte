<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { Offer, UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';
	import Tile from './Tile.svelte';

	/**
	 * The sector's break (SB10, B16): five photo tiles in one row that starts on the left margin
	 * and runs off the right edge of the screen, the last one cut, scrolling sideways. Each tile is
	 * one link to MOOON's own page.
	 */
	type Props = { items: Offer[]; text: UI['offer'] };
	let { items, text }: Props = $props();
</script>

<section class="section offer" id="offer">
	<div class="head frame">
		<Rise><p class="label">{text.label}</p></Rise>
		<Heading lines={text.lines} />
		<Rise><p class="lede">{text.lede}</p></Rise>
	</div>

	<ul class="row">
		{#each items as item (item.href)}
			<li>
				<Tile
					src={photos[item.photo]}
					alt={item.alt}
					sizes="(min-width: 900px) 21vw, 72vw"
					href={item.href}
				>
					<Rise>
						<h3>{item.title}</h3>
						<span class="line small">{item.line}</span>
						<span class="more label">{text.more}</span>
					</Rise>
				</Tile>
			</li>
		{/each}
	</ul>
</section>

<style>
	/* B31: the row starts on the margin; the end has no padding, so the last tile is cut at the edge */
	.row {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: clamp(15rem, 21vw, 19rem);
		gap: var(--space-4);
		padding-inline-start: var(--margin);
		overflow-x: auto;
		scroll-snap-type: x proximity;
		scroll-padding-inline-start: var(--margin);
		scrollbar-width: none;
	}
	.row::-webkit-scrollbar {
		display: none;
	}
	.row::after {
		content: '';
		width: 1px;
	}
	.row li {
		scroll-snap-align: start;
	}
	h3 {
		color: var(--paper);
	}
	.line {
		display: block;
		color: var(--muted);
		margin-bottom: var(--space-2);
	}
	.more {
		color: var(--paper);
	}
	@media (max-width: 900px) {
		/* MB05: a tile at 72 % of the screen, the next one showing a quarter */
		.row {
			grid-auto-columns: 72vw;
			scroll-snap-type: x mandatory;
		}
	}
</style>
