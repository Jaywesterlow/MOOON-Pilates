<script lang="ts">
	import type { Faq, UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';

	type Props = { groups: { group: string; items: Faq[] }[]; text: UI['faq'] };
	let { groups, text }: Props = $props();
</script>

<!-- MOOON's own questions and answers, from their "Prijzen en FAQs" page; FAQPage JSON-LD in the layout.
     A59: hairline rows, the whole question clickable, a plus on the right. -->
<section class="section frame faq" id="faq">
	<div class="grid">
		<div class="head">
			<Heading lines={text.lines} />
		</div>
		<div class="groups">
			{#each groups as group (group.group)}
				<div class="group">
					<Rise><h3>{group.group}</h3></Rise>
					<div class="rows">
						{#each group.items as item (item.question)}
							<details>
								<summary>
									<Rise>
										<span class="question">
											<span>{item.question}</span>
											<span class="sign" aria-hidden="true"></span>
										</span>
									</Rise>
								</summary>
								<p class="small">{item.answer}</p>
							</details>
						{/each}
					</div>
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
	summary {
		cursor: pointer;
		list-style: none;
		color: var(--night);
	}
	summary::-webkit-details-marker {
		display: none;
	}
	.question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-5);
		min-height: var(--tap);
		padding-block: var(--space-4);
	}
	/* a drawn plus that loses its upright when open; a state, not a movement */
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
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
		}
	}
</style>
