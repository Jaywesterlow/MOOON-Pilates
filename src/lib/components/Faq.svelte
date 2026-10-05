<script lang="ts">
	import type { Faq, UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';

	/**
	 * MOOON's own questions and answers, from their "Prijzen en FAQs" page; FAQPage JSON-LD in the
	 * layout. The split pattern (FA04): heading in the left 5 columns, the list from the 7 on the
	 * right. Hairline rows of one pitch, the question at 16 px, the answer one tone lighter, a plus
	 * on the right in the question's tone, every row closed on load (FB01 to FB12, FA14).
	 */
	type Props = { groups: { group: string; items: Faq[] }[]; text: UI['faq'] };
	let { groups, text }: Props = $props();
</script>

<section class="section frame faq" id="faq">
	<div class="split">
		<div class="head">
			<Rise><p class="label">{text.label}</p></Rise>
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
											<span class="plus" aria-hidden="true"></span>
										</span>
									</Rise>
								</summary>
								<p class="answer small">{item.answer}</p>
							</details>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.split {
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
	/* FB03: the question at 16 px, 500; the answer one step down in size and tone */
	summary {
		cursor: pointer;
		list-style: none;
		color: var(--paper);
		font-size: 1rem;
		font-weight: 500;
		line-height: 1.5;
	}
	summary::-webkit-details-marker {
		display: none;
	}
	/* FB01, FB02: 24 px above and below a 24 px line, a 72 px pitch on every closed row */
	.question {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-5);
		padding-block: var(--space-5);
	}
	/* a drawn plus that loses its upright when open; a state, not a movement */
	.plus {
		position: relative;
		flex: none;
		width: 0.875rem;
		height: 0.875rem;
	}
	.plus::before,
	.plus::after {
		content: '';
		position: absolute;
		background: currentColor;
	}
	.plus::before {
		left: 0;
		right: 0;
		top: calc(50% - 0.5px);
		height: 1px;
	}
	.plus::after {
		top: 0;
		bottom: 0;
		left: calc(50% - 0.5px);
		width: 1px;
	}
	details[open] .plus::after {
		display: none;
	}
	/* FB07: the open row's bottom padding at the row padding, the answer at 60 to 75ch */
	.answer {
		padding-bottom: var(--space-5);
		max-width: 38em;
	}
	@media (max-width: 900px) {
		.split {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
		}
	}
</style>
