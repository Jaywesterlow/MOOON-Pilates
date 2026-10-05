<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Photo from './Photo.svelte';
	import Rise from './Rise.svelte';

	/** Back on the night ground: the page's split mirrored (GB05), the founders on the large side, their words on the small. */
	type Props = { text: UI['founders'] };
	let { text }: Props = $props();
</script>

<section class="section frame founders" id="story">
	<div class="split">
		<Photo
			src={photos.founders}
			alt={text.alt}
			sizes="(min-width: 900px) 55vw, 100vw"
			ratio="5 / 4"
			position="50% 60%"
		/>
		<div class="copy">
			<div class="head">
				<Rise><p class="label">{text.label}</p></Rise>
				<Heading lines={text.lines} />
			</div>
			<Rise><p>{text.body}</p></Rise>
			<figure>
				<Rise>
					<blockquote lang="en">
						<p>“{text.quote}”</p>
					</blockquote>
				</Rise>
				<Rise>
					<figcaption class="small">
						<span lang="en">{text.signature}</span>
						<span class="names">{text.names}</span>
					</figcaption>
				</Rise>
			</figure>
		</div>
	</div>
</section>

<style>
	.split {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: var(--space-8);
		align-items: center;
	}
	.copy {
		display: grid;
		gap: var(--space-5);
	}
	.copy .head {
		margin-bottom: 0;
	}
	figure {
		display: grid;
		gap: var(--space-4);
		margin-top: var(--space-4);
		padding-top: var(--space-6);
		border-top: 1px solid var(--line-d);
	}
	/* T47: the quote well above body size, its opening mark hung outside the text edge */
	blockquote p {
		font-family: var(--font-display);
		font-size: var(--text-lede);
		line-height: 1.3;
		color: var(--paper);
		text-indent: -0.45em;
	}
	figcaption {
		display: grid;
	}
	.names {
		color: var(--paper);
	}
	@media (max-width: 900px) {
		.split {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-7);
		}
	}
</style>
