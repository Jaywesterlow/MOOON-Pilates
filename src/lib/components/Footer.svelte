<script lang="ts">
	import { resolve } from '$app/paths';
	import { site, type Locale, type Studio, type UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import Logo from './Logo.svelte';

	type Props = { studio: Studio; text: UI['footer']; locale: Locale };
	let { studio, text, locale }: Props = $props();

	/** the other language, by its own name; a full page load, as in the nav */
	const other = $derived<Locale>(locale === 'nl' ? 'en' : 'nl');
	const otherHref = $derived(
		resolve('/[[lang=locale]]', { lang: other === 'nl' ? undefined : other })
	);
</script>

<footer>
	<div class="wrap">
		<!-- the logo once more, across the full width: the last thing on the page is the name -->
		<div class="mark">
			<Logo alt={studio.fullName} sizes="(min-width: 1280px) 1136px, 100vw" />
		</div>

		<div class="cols">
			<p class="tag" lang="en">{text.tagline}</p>

			<address>
				{studio.address.street}, {studio.address.postalCode}
				{studio.address.city}<br />
				<a class="ul tap" href="mailto:{studio.email}">{studio.email}</a><br />
				<a class="ul tap" href={studio.whatsapp.href} target="_blank" rel="noopener">
					<span>WhatsApp {studio.whatsapp.display}</span>
				</a>
			</address>

			<ul class="links label">
				<li><a class="ul" href={studio.booking.url} onclick={booking.open}>{text.book}</a></li>
				{#each studio.socials as social (social.name)}
					<li><a class="ul" href={social.href} target="_blank" rel="noopener">{social.name}</a></li>
				{/each}
				<li>
					<a class="ul" href={otherHref} hreflang={other} lang={other} data-sveltekit-reload>
						{site.languages[other].name}
					</a>
				</li>
				<li><a class="ul" href="#top">{text.top}</a></li>
			</ul>
		</div>

		<div class="base label">
			<ul class="legal">
				<li>
					<a class="ul" href={studio.legal.privacy} target="_blank" rel="noopener">{text.privacy}</a
					>
				</li>
				<li>
					<a class="ul" href={studio.legal.houseRules} target="_blank" rel="noopener"
						>{text.houseRules}</a
					>
				</li>
				<li>
					<a class="ul" href={studio.legal.terms} target="_blank" rel="noopener">{text.terms}</a>
				</li>
			</ul>
			<p>{text.credit}</p>
		</div>
	</div>
</footer>

<style>
	footer {
		padding-block: var(--section) calc(var(--space-6) + env(safe-area-inset-bottom, 0px));
	}
	/* A06: the wordmark spans the full content width */
	.mark {
		--logo-h: auto;
	}
	.mark :global(img) {
		width: 100%;
	}
	.cols {
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(0, 5fr) minmax(0, 3fr);
		gap: var(--space-6);
		margin-top: var(--space-7);
		padding-top: var(--space-5);
		border-top: 1px solid var(--line);
	}
	.tag {
		text-wrap: balance;
		font-family: var(--font-display);
		font-size: var(--text-lede);
		line-height: 1.2;
		color: var(--night);
	}
	address {
		font-style: normal;
		font-size: var(--text-small);
		line-height: 1.6;
	}
	.links {
		display: grid;
		gap: var(--space-2);
		justify-items: end;
		color: var(--night);
	}
	.base {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-4);
		margin-top: var(--space-7);
		padding-top: var(--space-4);
		border-top: 1px solid var(--line);
		color: var(--ink-2);
	}
	.legal {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2) var(--space-5);
	}
	@media (max-width: 900px) {
		.cols {
			grid-template-columns: minmax(0, 1fr);
		}
		.links {
			justify-items: start;
			gap: 0;
		}
		/* one --tap high row per link on a phone */
		.links a,
		.legal a {
			display: inline-flex;
			align-items: center;
			min-height: var(--tap);
			--ul-offset: calc(50% - 0.5lh - 0.15em);
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
