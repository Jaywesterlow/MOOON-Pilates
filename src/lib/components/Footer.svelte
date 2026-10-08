<script lang="ts">
	import { resolve } from '$app/paths';
	import { site, type Locale, type Studio, type UI } from '$lib/data/studio';
	import { demo } from '$lib/state/demo.svelte';
	import Logo from './Logo.svelte';
	import Rise from './Rise.svelte';
	import Roll from './Roll.svelte';

	/**
	 * The sector's footer: the night ground, the logo once more, margin to margin (A06), one row
	 * of small-caps links with the tagline beside it, and the legal row with the credit (A60). The
	 * logo arrives as in the hero (the O's wax, the rest wipes) when the footer scrolls in; the
	 * tagline, the links and the legal row rise after it, 100 ms apart.
	 */
	type Props = { studio: Studio; text: UI['footer']; locale: Locale };
	let { studio, text, locale }: Props = $props();

	const other = $derived<Locale>(locale === 'nl' ? 'en' : 'nl');
	const otherHref = $derived(
		resolve('/[[lang=locale]]', { lang: other === 'nl' ? undefined : other })
	);
</script>

<footer class="frame">
	<div class="mark">
		<Logo alt={studio.fullName} reveal />
	</div>

	<div class="row">
		<Rise><p class="tag" lang="en">{text.tagline}</p></Rise>
		<Rise
			><ul class="links label">
				<li>
					<a class="link tap" href={studio.booking.url} onclick={demo.book}
						><Roll>{text.book}</Roll></a
					>
				</li>
				<li>
					<a class="link tap" href={studio.mailHref} onclick={demo.open}
						><Roll>{studio.email}</Roll></a
					>
				</li>
				<li>
					<a
						class="link tap"
						href={studio.whatsapp.href}
						onclick={demo.open}
						target="_blank"
						rel="noopener"><Roll>WhatsApp</Roll></a
					>
				</li>
				{#each studio.socials as social (social.name)}
					<li>
						<a
							class="link tap"
							href={social.href}
							onclick={demo.open}
							target="_blank"
							rel="noopener"><Roll>{social.name}</Roll></a
						>
					</li>
				{/each}
				<li>
					<a class="link tap" href={otherHref} hreflang={other} lang={other} data-sveltekit-reload
						><Roll>{site.languages[other].name}</Roll></a
					>
				</li>
				<li><a class="link tap" href="#top"><Roll>{text.top}</Roll></a></li>
			</ul></Rise
		>
	</div>

	<div class="base small">
		<Rise
			><ul class="legal">
				<li>
					<a
						class="link tap"
						href={studio.legal.privacy}
						onclick={demo.open}
						target="_blank"
						rel="noopener"><Roll>{text.privacy}</Roll></a
					>
				</li>
				<li>
					<a
						class="link tap"
						href={studio.legal.houseRules}
						onclick={demo.open}
						target="_blank"
						rel="noopener"><Roll>{text.houseRules}</Roll></a
					>
				</li>
				<li>
					<a
						class="link tap"
						href={studio.legal.terms}
						onclick={demo.open}
						target="_blank"
						rel="noopener"><Roll>{text.terms}</Roll></a
					>
				</li>
			</ul></Rise
		>
		<Rise><p>{text.credit}</p></Rise>
	</div>
</footer>

<style>
	footer {
		padding-block: var(--sparse) calc(var(--space-6) + env(safe-area-inset-bottom, 0px));
		border-top: 1px solid var(--line-d);
	}
	/* A06: the logo spans the content width exactly */
	.mark {
		--logo-h: auto;
	}
	.mark :global(.logo) {
		width: 100%;
		height: auto;
	}
	.row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		flex-wrap: wrap;
		gap: var(--space-5) var(--space-7);
		margin-top: var(--space-8);
	}
	.tag {
		text-wrap: balance;
		font-family: var(--font-display);
		font-size: var(--text-lede);
		line-height: 1.2;
		color: var(--paper);
		max-width: 22ch;
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--space-6);
	}
	.links .link {
		color: var(--paper);
	}
	.links .link:hover {
		color: var(--muted);
	}
	.base {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-4) var(--space-6);
		margin-top: var(--space-8);
		padding-top: var(--space-4);
		border-top: 1px solid var(--line-d);
	}
	.legal {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-5);
	}
	@media (max-width: 900px) {
		.row {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-5);
		}
		.links {
			flex-direction: column;
			gap: 0;
		}
		.base {
			flex-direction: column;
		}
		.legal {
			flex-direction: column;
			gap: 0;
		}
	}
</style>
