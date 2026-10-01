<script lang="ts">
	import type { Faq, UI } from '$lib/data/studio';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { groups: { group: string; items: Faq[] }[]; text: UI['faq'] };
	let { groups, text }: Props = $props();
</script>

<!-- MOOON's own questions and answers, from their "Prijzen en FAQs" page; FAQPage JSON-LD in the layout -->
<section class="section faq" id="faq">
	<div class="wrap grid">
		<div class="head">
			<RevealHeading lines={text.lines} />
		</div>
		<div class="groups">
			{#each groups as group (group.group)}
				<div class="group">
					<h3>{group.group}</h3>
					{#each group.items as item (item.question)}
						<details>
							<summary>
								<span>{item.question}</span>
								<span class="sign" aria-hidden="true"></span>
							</summary>
							<p>{item.answer}</p>
						</details>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: var(--space-8);
		align-items: start;
	}
	.groups {
		display: grid;
		gap: var(--space-7);
	}
	.group h3 {
		margin-bottom: var(--space-4);
	}
	details {
		border-top: 1px solid var(--line);
	}
	details:last-child {
		border-bottom: 1px solid var(--line);
	}
	summary {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-5);
		min-height: var(--tap);
		padding-block: var(--space-4);
		color: var(--night);
		cursor: pointer;
		list-style: none;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	/* a drawn plus that loses its upright when open; no movement, only a state */
	.sign {
		position: relative;
		flex: none;
		width: 0.875rem;
		height: 0.875rem;
	}
	.sign::before,
	.sign::after {
		content: '';
		position: absolute;
		background: currentColor;
	}
	.sign::before {
		left: 0;
		right: 0;
		top: calc(50% - 0.5px);
		height: 1px;
	}
	.sign::after {
		top: 0;
		bottom: 0;
		left: calc(50% - 0.5px);
		width: 1px;
	}
	details[open] .sign::after {
		display: none;
	}
	details p {
		padding-bottom: var(--space-5);
		max-width: 38em;
		color: var(--ink-2);
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
		}
	}
</style>
