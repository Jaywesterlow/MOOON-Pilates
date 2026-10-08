<script lang="ts">
	import { demo } from '$lib/state/demo.svelte';
	import type { OpeningWords, Studio, UI } from '$lib/data/studio';
	import { opening } from '$lib/state/opening.svelte';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';
	import Roll from './Roll.svelte';

	/** The practical facts on the key line: address, hours, contact, in three columns. */
	type Props = { studio: Studio; text: UI['visit']; words: OpeningWords };
	let { studio, text, words }: Props = $props();
</script>

<section class="section frame visit" id="visit">
	<div class="head">
		<Rise><p class="label">{text.label}</p></Rise>
		<Heading lines={text.lines} />
	</div>

	<div class="cols">
		<div class="col">
			<Rise>
				<h3 class="label">{text.find}</h3>
				<p>
					{studio.fullName}<br />
					{#if studio.address.street}{studio.address.street}<br />{/if}
					{studio.address.postalCode}
					{studio.address.city}
				</p>
				{#if studio.address.maps}
					<a
						class="link tap"
						href={studio.address.maps}
						onclick={demo.open}
						target="_blank"
						rel="noopener"
					>
						<Roll>{text.route}</Roll>
					</a>
				{/if}
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
				{#if !studio.whatsapp.href && !studio.email}
					<p class="small">{text.portfolioContact}</p>
				{/if}
				{#if studio.whatsapp.href}
					<a
						class="link tap"
						href={studio.whatsapp.href}
						onclick={demo.open}
						target="_blank"
						rel="noopener"
					>
						<Roll>{text.whatsapp} {studio.whatsapp.display}</Roll>
					</a>
					<br />
				{/if}
				{#if studio.email}
					<a class="link tap" href="mailto:{studio.email}" onclick={demo.open}
						><Roll>{studio.email}</Roll></a
					>
				{/if}
			</Rise>
		</div>
	</div>
</section>

<style>
	.cols {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-6);
	}
	.col {
		border-top: 1px solid var(--line-d);
		padding-top: var(--space-4);
	}
	.col h3 {
		margin-bottom: var(--space-3);
	}
	.col p + p {
		margin-top: var(--space-2);
	}
	@media (max-width: 900px) {
		.cols {
			grid-template-columns: minmax(0, 1fr);
		}
	}
</style>
