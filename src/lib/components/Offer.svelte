<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { Offer, UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Photo from './Photo.svelte';
	import Rise from './Rise.svelte';

	/**
	 * Five cards in one row that starts on the left margin and runs off the right edge of the
	 * screen (B01: the card row's break), scrolling sideways. Each card is one link; on hover a
	 * panel fills it from the bottom and leaves through the top, as the buttons do.
	 */
	type Props = { items: Offer[]; text: UI['offer'] };
	let { items, text }: Props = $props();
</script>

<section class="section offer" id="offer">
	<div class="head frame">
		<Heading lines={text.lines} />
		<Rise><p class="lede">{text.lede}</p></Rise>
	</div>

	<ul class="row">
		{#each items as item (item.href)}
			<li>
				<a class="card" href={item.href} target="_blank" rel="noopener">
					<span class="fill" aria-hidden="true"></span>
					<Photo
						src={photos[item.photo]}
						alt={item.alt}
						sizes="(min-width: 900px) 22vw, 68vw"
						ratio="3 / 4"
					/>
					<Rise>
						<h3>{item.title}</h3>
						<p class="small">{item.line}</p>
						<span class="more">{text.more}</span>
					</Rise>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.row {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: clamp(16rem, 22vw, 20rem);
		gap: var(--space-4);
		padding-inline: var(--margin);
		overflow-x: auto;
		scroll-snap-type: x proximity;
		scroll-padding-inline: var(--margin);
		scrollbar-width: none;
	}
	.row::-webkit-scrollbar {
		display: none;
	}
	.row li {
		scroll-snap-align: start;
	}
	.card {
		position: relative;
		isolation: isolate;
		display: grid;
		grid-template-rows: auto 1fr;
		gap: var(--space-4);
		padding: var(--space-4);
		margin: calc(var(--space-4) * -1);
	}
	.card :global(.photo) {
		margin: 0;
	}
	/* the same fill as the buttons: in from the bottom, out through the top */
	.fill {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--panel);
		clip-path: inset(0 0 100% 0);
		transition: clip-path 0.38s var(--ease-rise);
	}
	.card:hover .fill,
	.card:focus-visible .fill {
		clip-path: inset(0 0 0 0);
		animation: fill-in 0.38s var(--ease-rise);
	}
	@keyframes fill-in {
		from {
			clip-path: inset(100% 0 0 0);
		}
		to {
			clip-path: inset(0 0 0 0);
		}
	}
	h3 {
		margin-bottom: var(--space-1);
	}
	.more {
		display: inline-flex;
		align-items: center;
		min-height: var(--tap);
		font-size: var(--text-small);
		font-weight: 500;
		color: var(--night);
	}
	@media (max-width: 900px) {
		.row {
			grid-auto-columns: 68vw;
			scroll-snap-type: x mandatory;
		}
	}
</style>
