<script lang="ts">
	import Rise from './Rise.svelte';

	type Props = { items: string[]; label: string };
	let { items, label }: Props = $props();
</script>

<!-- the doubt-removers, before the offer: certified, both methods, every level -->
<section class="trust frame" aria-label={label}>
	<ul>
		{#each items as item (item)}
			<li><Rise>{item}</Rise></li>
		{/each}
	</ul>
</section>

<style>
	ul {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--space-5);
		padding-block: var(--space-6);
		font-family: var(--font-display);
		font-size: var(--text-small);
		line-height: 1.3;
		color: var(--night);
	}
	li {
		text-wrap: balance;
	}
	@media (max-width: 900px) {
		ul {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: var(--space-4) var(--space-5);
		}
	}
</style>
