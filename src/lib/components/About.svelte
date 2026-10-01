<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { UI } from '$lib/data/studio';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { text: UI['about']; benefits: { title: string; line: string }[] };
	let { text, benefits }: Props = $props();
</script>

<section class="section about" id="about">
	<div class="wrap grid">
		<div class="copy">
			<div class="head">
				<RevealHeading lines={text.lines} />
				<p class="lede">{text.lede}</p>
			</div>
			<ul class="benefits">
				{#each benefits as benefit (benefit.title)}
					<li>
						<h3>{benefit.title}</h3>
						<p>{benefit.line}</p>
					</li>
				{/each}
			</ul>
		</div>
		<div class="photo frame">
			<enhanced:img src={photos.reformer} alt={text.alt} sizes="(min-width: 900px) 40vw, 100vw" />
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: var(--space-8);
		align-items: center;
	}
	.benefits {
		display: grid;
		gap: var(--space-5);
		border-top: 1px solid var(--line);
		padding-top: var(--space-5);
	}
	.benefits li {
		display: grid;
		gap: var(--space-2);
	}
	.benefits p {
		color: var(--ink-2);
	}
	.frame {
		aspect-ratio: 4 / 5;
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-7);
		}
	}
</style>
