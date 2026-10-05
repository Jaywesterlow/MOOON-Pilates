<script lang="ts">
	import type { Studio, UI } from '$lib/data/studio';
	import { demo } from '$lib/state/demo.svelte';
	import Button from './Button.svelte';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';

	/** The first section on the moon's colour: the step that takes the doubt out of the first booking. */
	type Props = {
		studio: Studio;
		steps: { title: string; line: string }[];
		bring: string[];
		text: UI['first'];
	};
	let { studio, steps, bring, text }: Props = $props();
</script>

<section class="section frame light first" id="first-class">
	<div class="head">
		<Rise><p class="label">{text.label}</p></Rise>
		<Heading lines={text.lines} />
		<Rise><p class="lede">{text.lede}</p></Rise>
	</div>

	<div class="split">
		<ol class="steps">
			{#each steps as step, i (step.title)}
				<li>
					<Rise>
						<!-- order is information here: these are steps -->
						<span class="number numeric" aria-hidden="true">{i + 1}</span>
						<h3>{step.title}</h3>
						<p class="small">{step.line}</p>
					</Rise>
				</li>
			{/each}
		</ol>

		<div class="bring">
			<Rise>
				<h3 class="label">{text.bring}</h3>
				<ul>
					{#each bring as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</Rise>
		</div>
	</div>

	<div class="cta">
		<Rise inline>
			<Button href={studio.booking.url} onclick={demo.book} variant="night">{text.book}</Button>
		</Rise>
		<Rise><p class="small">{text.app}</p></Rise>
	</div>
</section>

<style>
	.first {
		padding-top: var(--space-6);
	}
	.split {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: var(--space-8);
	}
	.steps {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-6);
	}
	.steps li,
	.bring {
		border-top: 1px solid var(--line);
		padding-top: var(--space-4);
	}
	.number {
		display: block;
		font-family: var(--font-display);
		font-size: var(--text-h2);
		line-height: 1;
		color: var(--olive);
		margin-bottom: var(--space-4);
	}
	.steps h3 {
		margin-bottom: var(--space-1);
	}
	.bring h3 {
		margin-bottom: var(--space-4);
	}
	.bring ul {
		display: grid;
		gap: var(--space-2);
	}
	.cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-4) var(--space-6);
		margin-top: var(--space-7);
	}
	.cta p {
		max-width: 28em;
	}
	@media (max-width: 900px) {
		.split,
		.steps {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-6);
		}
	}
</style>
