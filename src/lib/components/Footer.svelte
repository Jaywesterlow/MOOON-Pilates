<script lang="ts">
	import { resolve } from '$app/paths';
	import { site, type Locale, type Studio, type UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import Logo from './Logo.svelte';

	/**
	 * The footer: a night band with the logo once more, margin to margin (A06), then the tagline
	 * and three labelled columns (A60), and the legal row with the credit.
	 */
	type Props = { studio: Studio; text: UI['footer']; locale: Locale };
	let { studio, text, locale }: Props = $props();

	const other = $derived<Locale>(locale === 'nl' ? 'en' : 'nl');
	const otherHref = $derived(
		resolve('/[[lang=locale]]', { lang: other === 'nl' ? undefined : other })
	);
</script>

<footer class="frame dark">
	<div class="mark">
		<Logo alt={studio.fullName} tone="light" sizes="(min-width: 1280px) 1136px, 100vw" />
	</div>

	<div class="cols">
		<p class="tag" lang="en">{text.tagline}</p>

		<div class="col">
			<h2 class="label">{text.contact}</h2>
			<address>
				{studio.address.street}<br />
				{studio.address.postalCode}
				{studio.address.city}
			</address>
			<a class="link tap" href="mailto:{studio.email}">{studio.email}</a><br />
			<a class="link tap" href={studio.whatsapp.href} target="_blank" rel="noopener">
				WhatsApp {studio.whatsapp.display}
			</a>
		</div>

		<div class="col">
			<h2 class="label">{text.follow}</h2>
			<ul>
				{#each studio.socials as social (social.name)}
					<li>
						<a class="link tap" href={social.href} target="_blank" rel="noopener">{social.name}</a>
					</li>
				{/each}
			</ul>
		</div>

		<div class="col">
			<h2 class="label">{text.more}</h2>
			<ul>
				<li>
					<a class="link tap" href={studio.booking.url} onclick={booking.open}>{text.book}</a>
				</li>
				<li>
					<a class="link tap" href={otherHref} hreflang={other} lang={other} data-sveltekit-reload>
						{site.languages[other].name}
					</a>
				</li>
				<li><a class="link tap" href="#top">{text.top}</a></li>
			</ul>
		</div>
	</div>

	<div class="base small">
		<ul class="legal">
			<li>
				<a class="link tap" href={studio.legal.privacy} target="_blank" rel="noopener">
					{text.privacy}
				</a>
			</li>
			<li>
				<a class="link tap" href={studio.legal.houseRules} target="_blank" rel="noopener">
					{text.houseRules}
				</a>
			</li>
			<li>
				<a class="link tap" href={studio.legal.terms} target="_blank" rel="noopener">
					{text.terms}
				</a>
			</li>
		</ul>
		<p>{text.credit}</p>
	</div>
</footer>

<style>
	footer {
		padding-block: var(--section) calc(var(--space-6) + env(safe-area-inset-bottom, 0px));
	}
	/* A06: the logo spans the content width exactly */
	.mark {
		--logo-h: auto;
	}
	.mark :global(img) {
		width: 100%;
	}
	.cols {
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(0, 3fr) minmax(0, 2fr) minmax(0, 3fr);
		gap: var(--space-6);
		margin-top: var(--space-8);
	}
	.tag {
		text-wrap: balance;
		font-family: var(--font-display);
		font-size: var(--text-lede);
		line-height: 1.2;
		color: var(--paper-d);
		max-width: 12em;
	}
	.col .label {
		font-family: var(--font-body);
		color: var(--muted-d);
		margin-bottom: var(--space-3);
	}
	.col address {
		margin-bottom: var(--space-2);
	}
	.col .link {
		color: var(--paper-d);
	}
	.col .link:hover {
		color: var(--muted-d);
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
		.cols {
			grid-template-columns: minmax(0, 1fr);
			gap: var(--space-6);
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
