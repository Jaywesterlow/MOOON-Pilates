<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { StudioPhoto, UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Photo from './Photo.svelte';
	import Rise from './Rise.svelte';

	/** On the moon's colour: the studio, in the photos from the DASHENKO shoot. */
	type Props = { items: StudioPhoto[]; text: UI['studio'] };
	let { items, text }: Props = $props();
</script>

<section class="frame dark studio" id="studio">
	<div class="head">
		<Heading lines={text.lines} />
		<Rise><p class="lede">{text.lede}</p></Rise>
	</div>

	<ul class="row">
		{#each items as item (item.photo)}
			<li>
				<Photo
					src={photos[item.photo]}
					alt={item.alt}
					sizes="(min-width: 900px) 28vw, 32vw"
					ratio="2 / 3"
				/>
			</li>
		{/each}
	</ul>
</section>

<style>
	.studio {
		padding-block: var(--space-7) var(--section);
	}
	.row {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-5);
	}
	.row :global(.photo) {
		background: var(--olive);
	}
	@media (max-width: 900px) {
		.row {
			gap: var(--space-2);
		}
	}
</style>
