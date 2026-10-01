<script lang="ts">
	type Props = { items: string[]; label: string };
	let { items, label }: Props = $props();
</script>

<!-- the doubt-removers, before the offer: certified, both methods, every level -->
<section class="trust" aria-label={label}>
	<ul class="wrap">
		{#each items as item (item)}
			<li>{item}</li>
		{/each}
	</ul>
</section>

<style>
	.trust {
		border-block: 1px solid var(--line);
	}
	ul {
		text-wrap: balance;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--space-5);
		padding-block: var(--space-5);
		font-family: var(--font-display);
		font-size: var(--text-small);
		line-height: 1.3;
		color: var(--night);
	}
	@media (max-width: 900px) {
		ul {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: var(--space-4) var(--space-5);
		}
	}
</style>
