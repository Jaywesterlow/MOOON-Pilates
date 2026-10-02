<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Photo from './Photo.svelte';
	import Rise from './Rise.svelte';

	/** The founders' story, still on the moon's colour: the band ends with their own words. */
	type Props = { text: UI['founders'] };
	let { text }: Props = $props();
</script>

<section class="section frame dark founders" id="story">
	<div class="grid">
		<Photo
			src={photos.founders}
			alt={text.alt}
			sizes="(min-width: 900px) 40vw, 100vw"
			ratio="4 / 5"
		/>
		<div class="copy">
			<Heading lines={text.lines} />
			<Rise><p>{text.body}</p></Rise>
			<figure>
				<Rise>
					<blockquote lang="en">
						<p>“{text.quote}”</p>
					</blockquote>
				</Rise>
				<Rise>
					<figcaption>
						<span lang="en">{text.signature}</span>
						<span class="names">{text.names}</span>
					</figcaption>
				</Rise>
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
	.founders :global(.photo) {
		background: var(--olive);
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
		border-top: 1px solid var(--line-d);
	}
	/* T47: the quote well above body size, its opening mark hung outside the text edge */
	blockquote p {
		font-family: var(--font-display);
		font-size: var(--text-lede);
		line-height: 1.3;
		color: var(--paper-d);
		text-indent: -0.45em;
	}
	figcaption {
		display: grid;
		font-size: var(--text-small);
	}
	.names {
		color: var(--paper-d);
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-7);
		}
	}
</style>
