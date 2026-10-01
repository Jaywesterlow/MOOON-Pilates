<script lang="ts">
	import { photos } from '$lib/assets/photos';
	import type { Studio, UI } from '$lib/data/studio';
	import RevealHeading from './RevealHeading.svelte';

	type Props = { studio: Studio; occasions: string[]; text: UI['more'] };
	let { studio, occasions, text }: Props = $props();
</script>

<section class="section more" id="more">
	<div class="wrap grid">
		<div class="copy">
			<p class="label sub">{text.sub}</p>
			<RevealHeading lines={text.lines} />
			<p>{text.body}</p>
			<ul class="occasions">
				{#each occasions as occasion (occasion)}
					<li>{occasion}</li>
				{/each}
			</ul>
			<div class="contact">
				<p class="label">{text.contact}</p>
				<a class="ul tap" href={studio.whatsapp.href} target="_blank" rel="noopener">
					<span>WhatsApp {studio.whatsapp.display}</span>
				</a>
				<a class="ul tap" href="mailto:{studio.email}">{studio.email}</a>
			</div>
		</div>
		<div class="photo frame">
			<enhanced:img
				src={photos.more}
				alt={text.alt}
				sizes="(min-width: 900px) 40vw, 100vw"
				loading="lazy"
			/>
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
	.copy {
		display: grid;
		gap: var(--space-5);
		justify-items: start;
		max-width: 36rem;
	}
	/* T21: the label sits 8px above its heading */
	.sub {
		color: var(--ink-2);
		margin-bottom: calc(var(--space-3) * -1);
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
		gap: var(--space-2);
		border-top: 1px solid var(--line);
		padding-top: var(--space-4);
		width: 100%;
	}
	.contact .label {
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
