<script lang="ts">
	import { demo } from '$lib/state/demo.svelte';
	import { photos } from '$lib/assets/photos';
	import type { Studio, UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Photo from './Photo.svelte';
	import Rise from './Rise.svelte';
	import Roll from './Roll.svelte';

	/** The page's split again, copy on the key line, the photo on the large side. */
	type Props = { studio: Studio; occasions: string[]; text: UI['more'] };
	let { studio, occasions, text }: Props = $props();
</script>

<section class="section frame more" id="more">
	<div class="split">
		<div class="copy">
			<div class="head">
				<Rise><p class="label">{text.label}</p></Rise>
				<Heading lines={text.lines} />
			</div>
			<Rise><p>{text.body}</p></Rise>
			<Rise>
				<ul class="occasions">
					{#each occasions as occasion (occasion)}
						<li>{occasion}</li>
					{/each}
				</ul>
			</Rise>
			<Rise>
				<div class="contact">
					<p class="label">{text.contact}</p>
					<a
						class="link tap"
						href={studio.whatsapp.href}
						onclick={demo.open}
						target="_blank"
						rel="noopener"
					>
						<Roll>WhatsApp {studio.whatsapp.display}</Roll>
					</a>
					<a class="link tap" href="mailto:{studio.email}" onclick={demo.open}
						><Roll>{studio.email}</Roll></a
					>
				</div>
			</Rise>
		</div>
		<Photo
			src={photos.more}
			alt={text.alt}
			sizes="(min-width: 900px) 55vw, 100vw"
			ratio="5 / 4"
			position="50% 35%"
		/>
	</div>
</section>

<style>
	.split {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
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
	.occasions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-5);
		font-family: var(--font-display);
		color: var(--paper);
	}
	.contact {
		display: grid;
		justify-items: start;
		border-top: 1px solid var(--line-d);
		padding-top: var(--space-4);
	}
	.contact .label {
		margin-bottom: var(--space-2);
	}
	@media (max-width: 900px) {
		.split {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-7);
		}
		.split > :global(.photo) {
			order: -1;
		}
	}
</style>
