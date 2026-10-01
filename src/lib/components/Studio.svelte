<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { StudioPhoto, UI } from '$lib/data/studio';
	import { moonRise } from '$lib/motion/attachments';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { items: StudioPhoto[]; text: UI['studio'] };
	let { items, text }: Props = $props();
</script>

<!-- The signature moment (01b): a full moon rises over the dark band and opens on the studio.
     The disc is a square that always fits the screen, so the circle is never cut off. -->
<section class="studio" id="studio">
	<div class="wrap">
		<div class="head">
			<RevealHeading lines={text.lines} />
			<p class="lede">{text.lede}</p>
		</div>
	</div>

	<div class="stage" {@attach moonRise()}>
		<div class="disc photo" data-moon data-reveal="moon">
			<enhanced:img
				src={photos.moon}
				alt={text.moonAlt}
				sizes="(min-width: 900px) 44rem, 90vw"
				loading="lazy"
			/>
		</div>
	</div>

	<ul class="wrap row">
		{#each items as item (item.photo)}
			<li class="photo">
				<enhanced:img
					src={photos[item.photo]}
					alt={item.alt}
					sizes="(min-width: 900px) 28vw, 32vw"
					loading="lazy"
				/>
			</li>
		{/each}
	</ul>
</section>

<style>
	.studio {
		/* the moon: as large as possible, never wider than the page or taller than the space
		   between the nav and the bottom of the screen, so the full circle always shows */
		--moon: min(calc(100vw - 2 * var(--gutter)), calc(100svh - 2 * var(--nav-h) - 2rem), 44rem);

		background: var(--night-gradient);
		color: var(--muted-d);
		padding-block: var(--section);
	}
	.studio :global(.display) {
		color: var(--paper-d);
	}
	.head {
		margin-bottom: 0;
	}
	.stage {
		display: grid;
		place-items: center;
		min-height: 100vh;
		min-height: 100svh;
	}
	.disc {
		width: var(--moon);
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--olive);
	}
	.row {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-5);
	}
	.row li {
		aspect-ratio: 2 / 3;
		background: var(--olive);
	}
	@media (max-width: 900px) {
		.row {
			gap: var(--space-2);
		}
	}
</style>
