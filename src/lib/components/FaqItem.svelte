<script lang="ts">
	import { slide } from 'svelte/transition';
	import Rise from './Rise.svelte';

	/**
	 * One FAQ row: the whole question is the trigger, closed on load, independent of its siblings
	 * (FA14, FA24). The answer slides open in 250 ms and closed in 200 ms (FA27); only the plus
	 * changes with the state, the row keeps its height (FB14, FB16).
	 */
	type Props = { question: string; answer: string };
	let { question, answer }: Props = $props();

	let open = $state(false);
	const id = $props.id();
</script>

<div class="item">
	<button class="question" aria-expanded={open} aria-controls={id} onclick={() => (open = !open)}>
		<Rise>
			<span class="row">
				<span>{question}</span>
				<span class="plus" aria-hidden="true"></span>
			</span>
		</Rise>
	</button>
	{#if open}
		<p class="answer small" {id} in:slide={{ duration: 250 }} out:slide={{ duration: 200 }}>
			{answer}
		</p>
	{/if}
</div>

<style>
	/* FB03: the question at 16 px, 500; the answer one step down in size and tone */
	.question {
		display: block;
		width: 100%;
		border: 0;
		background: none;
		padding: 0;
		color: inherit;
		font: 500 1rem / 1.5 var(--font-body);
		text-align: left;
		cursor: pointer;
	}
	/* FB01, FB02: 24 px above and below a 24 px line, a 72 px pitch on every closed row */
	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-5);
		padding-block: var(--space-5);
	}
	/* a drawn plus that loses its upright when open */
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
	.question[aria-expanded='true'] .plus::after {
		display: none;
	}
	/* FB07: the open row's bottom padding at the row padding, the answer at 60 to 75ch */
	.answer {
		padding-bottom: var(--space-5);
		max-width: 38em;
	}
</style>
