<script lang="ts">
	import type { Faq, UI } from '$lib/data/studio';
	import FaqItem from './FaqItem.svelte';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';

	/**
	 * MOOON's own questions and answers, from their "Prijzen en FAQs" page; FAQPage JSON-LD in the
	 * layout. The split pattern (FA04): heading in the left 5 columns, the list from the 7 on the
	 * right. Hairline rows of one pitch, the question at 16 px, the answer one tone lighter, a plus
	 * on the right in the question's tone, every row closed on load, the answer sliding open
	 * (`FaqItem.svelte`; FB01 to FB12, FA14, FA27).
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
							<FaqItem question={item.question} answer={item.answer} />
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
	@media (max-width: 900px) {
		.split {
			grid-template-columns: minmax(0, 1fr);
			gap: 0;
		}
	}
</style>
