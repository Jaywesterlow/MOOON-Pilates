<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { UI } from '$lib/data/studio';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { text: UI['founders'] };
	let { text }: Props = $props();
</script>

<section class="section founders" id="story">
	<div class="wrap grid">
		<div class="photo frame">
			<enhanced:img
				src={photos.founders}
				alt={text.alt}
				sizes="(min-width: 900px) 40vw, 100vw"
				loading="lazy"
			/>
		</div>
		<div class="copy">
			<RevealHeading lines={text.lines} />
			<p>{text.body}</p>
			<figure>
				<blockquote lang="en">
					<p>“{text.quote}”</p>
				</blockquote>
				<figcaption>
					<span lang="en">{text.signature}</span>
					<span class="names">{text.names}</span>
				</figcaption>
			</figure>
		</div>
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: var(--space-8);
		align-items: center;
	}
	.frame {
		aspect-ratio: 4 / 5;
	}
	.copy {
		display: grid;
		gap: var(--space-5);
		max-width: 36rem;
	}
	figure {
		display: grid;
		gap: var(--space-4);
		margin-top: var(--space-5);
		padding-top: var(--space-6);
		border-top: 1px solid var(--line);
	}
	/* T47: the quote well above body size, its opening mark hung outside the text edge */
	blockquote p {
		font-family: var(--font-display);
		font-size: var(--text-lede);
		line-height: 1.3;
		color: var(--night);
		text-indent: -0.45em;
	}
	figcaption {
		display: grid;
		font-size: var(--text-small);
		color: var(--ink-2);
	}
	.names {
		color: var(--ink);
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-7);
		}
	}
</style>
