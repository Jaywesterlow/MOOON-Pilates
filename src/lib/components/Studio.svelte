<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { StudioPhoto, UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';
	import Tile from './Tile.svelte';

	/** The studio in the DASHENKO photos: the sector's carousel once more, larger tiles, bleeding right (SB10). */
	type Props = { items: StudioPhoto[]; text: UI['studio'] };
	let { items, text }: Props = $props();
</script>

<section class="section studio" id="studio">
	<div class="head frame">
		<Rise><p class="label">{text.label}</p></Rise>
		<Heading lines={text.lines} />
		<Rise><p class="lede">{text.lede}</p></Rise>
	</div>

	<ul class="row">
		{#each items as item (item.photo)}
			<li>
				<Tile src={photos[item.photo]} alt={item.alt} sizes="(min-width: 900px) 27vw, 72vw" />
			</li>
		{/each}
	</ul>
</section>

<style>
	.row {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: clamp(16rem, 27vw, 24rem);
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
	@media (max-width: 900px) {
		.row {
			grid-auto-columns: 72vw;
			scroll-snap-type: x mandatory;
		}
	}
</style>
