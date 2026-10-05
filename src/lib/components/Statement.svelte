<script lang="ts">
	import type { UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';

	/**
	 * The centred statement under the hero (GA21), the sector's second centred section: one of
	 * MOOON's own taglines in Aboreto, and under it the trust line as one row of labels.
	 */
	type Props = { text: UI['statement']; items: string[] };
	let { text, items }: Props = $props();
</script>

<section class="statement frame sparse" aria-label={text.label}>
	<Heading lines={text.lines} centred />
	<ul class="trust">
		{#each items as item (item)}
			<li><Rise><span class="label">{item}</span></Rise></li>
		{/each}
	</ul>
</section>

<style>
	.statement {
		display: grid;
		justify-items: center;
		gap: var(--space-6);
		text-align: center;
	}
	.statement :global(.display) {
		max-width: 24ch;
	}
	.trust {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--space-3) var(--space-7);
	}
	@media (max-width: 900px) {
		.trust {
			gap: var(--space-2) var(--space-5);
		}
	}
</style>
