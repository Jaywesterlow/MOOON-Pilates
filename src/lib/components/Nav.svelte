<script lang="ts">
	import { fade } from 'svelte/transition';
	import { innerHeight, scrollY } from 'svelte/reactivity/window';
	import type { Locale, NavLink, Studio, UI } from '$lib/data/studio';
	import { demo } from '$lib/state/demo.svelte';
	import Button from './Button.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import Logo from './Logo.svelte';
	import Roll from './Roll.svelte';

	/**
	 * A two-zone bar over the hero (NA01): the logo on the left margin, the links, the language
	 * and the one filled button ending on the right margin, the same margin every band uses.
	 * Transparent over the hero; once the hero's bottom edge has passed, it gains the page's own
	 * surface and one hairline, faded in over 200 ms (NB15, NA21, NC26). Nothing else changes.
	 * The logo is always there.
	 */
	type Props = { studio: Studio; links: NavLink[]; text: UI['nav']; locale: Locale };
	let { studio, links, text, locale }: Props = $props();

	let menuOpen = $state(false);
	const close = () => (menuOpen = false);

	/** the hero is one screen; the bar gets its surface as the hero's last band, with the corner lines, reaches it */
	const scrolled = $derived((scrollY.current ?? 0) > (innerHeight.current ?? Infinity) - 216);
</script>

<nav class={['nav', 'frame', { scrolled: scrolled || menuOpen }]} aria-label={text.label}>
	<a class="brand" href="#top" onclick={close}>
		<Logo alt={studio.name} />
	</a>

	<ul class="links">
		{#each links as link (link.href)}
			<li><a class="link label tap" href={link.href}><Roll>{link.label}</Roll></a></li>
		{/each}
	</ul>

	<div class="right">
		<LangSwitch {locale} />
		<div class="book">
			<Button href={studio.booking.url} onclick={demo.book} size="sm">{text.book}</Button>
		</div>
		<button
			class="menu-button link label tap"
			aria-expanded={menuOpen}
			aria-controls="menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			<Roll>{menuOpen ? text.close : text.menu}</Roll>
		</button>
	</div>
</nav>

{#if menuOpen}
	<!-- on a phone the links drop down under the bar as a sheet, on the same margin (NA26, NB25) -->
	<div class="menu frame" id="menu" transition:fade={{ duration: 200 }}>
		<ul class="rows">
			{#each links as link (link.href)}
				<li><a class="row" href={link.href} onclick={close}><Roll>{link.label}</Roll></a></li>
			{/each}
		</ul>
		<div class="menu-book">
			<Button
				href={studio.booking.url}
				onclick={(event) => {
					close();
					demo.book(event);
				}}
			>
				{text.book}
			</Button>
		</div>
	</div>
{/if}

<style>
	.nav {
		--logo-h: 1.625rem;

		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		display: flex;
		align-items: center;
		gap: var(--space-6);
		height: var(--nav-h);
		color: var(--paper);
		background: transparent;
		border-bottom: 1px solid transparent;
		transition:
			background-color 0.2s ease-out,
			border-color 0.2s ease-out;
	}
	.scrolled {
		background: var(--night);
		border-bottom-color: var(--line-d);
	}
	.brand {
		display: inline-flex;
		align-items: center;
		min-height: var(--tap);
	}
	.links {
		display: flex;
		gap: var(--space-6);
	}
	.right {
		display: flex;
		align-items: center;
		gap: var(--space-5);
		margin-left: auto;
	}
	.menu-button {
		display: none;
		border: 0;
		background: none;
		padding: 0;
		cursor: pointer;
	}
	.menu {
		position: fixed;
		inset: var(--nav-h) 0 0 0;
		z-index: 40;
		padding-block: var(--space-4) var(--space-7);
		background: var(--night);
		color: var(--paper);
		overflow-y: auto;
	}
	.row {
		display: flex;
		align-items: center;
		min-height: 3.5rem;
		font-size: var(--text-body);
		font-weight: 500;
	}
	.menu-book {
		margin-top: var(--space-6);
	}
	@media (max-width: 900px) {
		.nav {
			--logo-h: 1.375rem;
		}
		.links,
		.book {
			display: none;
		}
		.menu-button {
			display: inline-flex;
		}
	}
</style>
