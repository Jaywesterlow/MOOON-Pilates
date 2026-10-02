<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { Studio, UI } from '$lib/data/studio';
	import Heading from './Heading.svelte';
	import Photo from './Photo.svelte';
	import Rise from './Rise.svelte';

	type Props = { studio: Studio; occasions: string[]; text: UI['more'] };
	let { studio, occasions, text }: Props = $props();
</script>

<section class="section frame more" id="more">
	<div class="grid">
		<div class="copy">
			<Rise><p class="label sub">{text.sub}</p></Rise>
			<Heading lines={text.lines} />
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
					<a class="link tap" href={studio.whatsapp.href} target="_blank" rel="noopener">
						WhatsApp {studio.whatsapp.display}
					</a>
					<a class="link tap" href="mailto:{studio.email}">{studio.email}</a>
				</div>
			</Rise>
		</div>
		<Photo src={photos.more} alt={text.alt} sizes="(min-width: 900px) 40vw, 100vw" ratio="4 / 5" />
	</div>
</section>

<style>
	.grid {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: var(--space-8);
		align-items: center;
	}
	.copy {
		display: grid;
		gap: var(--space-5);
		max-width: 36rem;
	}
	/* T21: the label sits 8px above its heading */
	.sub {
		color: var(--ink-2);
		margin-bottom: calc(var(--space-4) * -1);
	}
	.occasions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-5);
		font-family: var(--font-display);
		color: var(--night);
	}
	.contact {
		display: grid;
		justify-items: start;
		border-top: 1px solid var(--line);
		padding-top: var(--space-4);
	}
	.contact .label {
		color: var(--ink-2);
		margin-bottom: var(--space-2);
	}
	@media (max-width: 900px) {
		.grid {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-7);
		}
	}
</style>
