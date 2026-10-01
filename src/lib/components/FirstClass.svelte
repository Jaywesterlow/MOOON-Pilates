<script lang="ts">
	import type { Studio, UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import Button from './Button.svelte';
	import RevealHeading from './RevealHeading.svelte';

	type Props = {
		studio: Studio;
		steps: { title: string; line: string }[];
		bring: string[];
		text: UI['first'];
	};
	let { studio, steps, bring, text }: Props = $props();
</script>

<!-- the step that takes the doubt out of the first booking -->
<section class="section first" id="first-class">
	<div class="wrap">
		<div class="head">
			<RevealHeading lines={text.lines} />
			<p class="lede">{text.lede}</p>
		</div>

		<div class="grid">
			<ol class="steps">
				{#each steps as step, i (step.title)}
					<li>
						<span class="number" aria-hidden="true">{i + 1}</span>
						<div>
							<h3>{step.title}</h3>
							<p>{step.line}</p>
						</div>
					</li>
				{/each}
			</ol>

			<div class="bring">
				<h3 class="label">{text.bring}</h3>
				<ul>
					{#each bring as item (item)}
						<li>{item}</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="cta">
			<Button href={studio.booking.url} onclick={booking.open} size="lg" magnetic>
				{text.book}
			</Button>
			<p class="small">{text.app}</p>
		</div>
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
	.steps li {
		display: grid;
		gap: var(--space-4);
		align-content: start;
		border-top: 1px solid var(--line);
		padding-top: var(--space-4);
	}
	.steps div {
		display: grid;
		gap: var(--space-2);
	}
	.steps p {
		color: var(--ink-2);
	}
	/* order is information here: these are steps */
	.number {
		font-family: var(--font-display);
		font-size: var(--text-h2);
		line-height: 1;
		color: var(--olive);
	}
	.bring {
		display: grid;
		gap: var(--space-4);
		align-content: start;
		border-top: 1px solid var(--line);
		padding-top: var(--space-4);
	}
	.bring h3 {
		font-family: var(--font-body);
		color: var(--ink-2);
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
		.steps li {
			grid-template-columns: 3rem minmax(0, 1fr);
		}
	}
</style>
