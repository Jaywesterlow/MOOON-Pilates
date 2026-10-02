<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Photo from './Photo.svelte';
	import Rise from './Rise.svelte';

	type Props = { text: UI['about']; benefits: { title: string; line: string }[] };
	let { text, benefits }: Props = $props();
</script>

<section class="section frame about" id="about">
	<div class="grid">
		<div>
			<div class="head">
				<Heading lines={text.lines} />
				<Rise><p class="lede">{text.lede}</p></Rise>
			</div>
			<ul class="benefits rows">
				{#each benefits as benefit (benefit.title)}
					<li>
						<Rise>
							<h3>{benefit.title}</h3>
							<p class="small">{benefit.line}</p>
						</Rise>
					</li>
				{/each}
			</ul>
		</div>
		<Photo
			src={photos.reformer}
			alt={text.alt}
			sizes="(min-width: 900px) 40vw, 100vw"
			ratio="4 / 5"
		/>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: var(--space-8);
		align-items: center;
	}
	.benefits li {
		padding-block: var(--space-4);
	}
	.benefits h3 {
		margin-bottom: var(--space-1);
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-7);
		}
	}
</style>
