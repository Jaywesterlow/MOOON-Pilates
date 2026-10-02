<script lang="ts">
	import type { Studio, UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import Button from './Button.svelte';
	import Heading from './Heading.svelte';
	import Rise from './Rise.svelte';

	type Props = {
		studio: Studio;
		steps: { title: string; line: string }[];
		bring: string[];
		text: UI['first'];
	};
	let { studio, steps, bring, text }: Props = $props();
</script>

<!-- the step that takes the doubt out of the first booking; a panel band, the copy on the margin -->
<section class="section frame first" id="first-class">
	<div class="head">
		<Heading lines={text.lines} />
		<Rise><p class="lede">{text.lede}</p></Rise>
	</div>

	<div class="grid">
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
			<Button href={studio.booking.url} onclick={booking.open}>{text.book}</Button>
		</Rise>
		<Rise><p class="small">{text.app}</p></Rise>
	</div>
</section>

<style>
	.first {
		background: var(--panel);
	}
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 8fr) minmax(0, 4fr);
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
		font-family: var(--font-body);
		color: var(--ink-2);
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
		.grid,
		.steps {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-6);
		}
	}
</style>
