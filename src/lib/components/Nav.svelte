<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Locale, NavLink, Studio, UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import Button from './Button.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import Logo from './Logo.svelte';

	/**
	 * The bar: part of the first screen, then it stays. Nothing in it changes with the scroll.
	 * Logo on the left margin, the links beside it, the language and the one filled button
	 * ending on the right margin, the same margin every band below uses.
	 */
	type Props = { studio: Studio; links: NavLink[]; text: UI['nav']; locale: Locale };
	let { studio, links, text, locale }: Props = $props();

	let menuOpen = $state(false);
	const close = () => (menuOpen = false);
</script>

<nav class="nav frame" aria-label={text.label}>
	<a class="brand" href="#top" onclick={close}>
		<Logo alt={studio.name} eager />
	</a>

	<ul class="links">
		{#each links as link (link.href)}
			<li><a class="link tap" href={link.href}>{link.label}</a></li>
		{/each}
	</ul>

	<div class="right">
		<LangSwitch {locale} />
		<div class="book">
			<Button href={studio.booking.url} onclick={booking.open}>{text.book}</Button>
		</div>
		<button
			class="menu-button link tap"
			aria-expanded={menuOpen}
			aria-controls="menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{menuOpen ? text.close : text.menu}
		</button>
	</div>
</nav>

{#if menuOpen}
	<!-- on a phone the links drop down under the bar, on the same margin -->
	<div class="menu frame" id="menu" transition:fade={{ duration: 200 }}>
		<ul class="rows">
			{#each links as link (link.href)}
				<li><a href={link.href} onclick={close}>{link.label}</a></li>
			{/each}
		</ul>
		<div class="menu-book">
			<Button
				href={studio.booking.url}
				onclick={(event) => {
					close();
					booking.open(event);
				}}
			>
				{text.book}
			</Button>
		</div>
	</div>
{/if}

<style>
	.nav {
		--logo-h: 1.75rem;

		position: sticky;
		top: 0;
		z-index: 50;
		display: flex;
		align-items: center;
		gap: var(--space-6);
		height: var(--nav-h);
		background: var(--paper);
		color: var(--night);
	}
	.brand {
		display: inline-flex;
		align-items: center;
		min-height: var(--tap);
	}
	.links {
		display: flex;
		gap: var(--space-5);
		font-size: var(--text-small);
		font-weight: 500;
	}
	.right {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		margin-left: auto;
	}
	.menu-button {
		display: none;
		border: 0;
		background: none;
		padding: 0;
		font: 500 var(--text-small) / 1.55 var(--font-body);
		cursor: pointer;
	}
	.menu {
		position: fixed;
		inset: var(--nav-h) 0 0 0;
		z-index: 40;
		padding-block: var(--space-4) var(--space-7);
		background: var(--paper);
		color: var(--night);
		overflow-y: auto;
	}
	.menu li a {
		display: flex;
		align-items: center;
		min-height: var(--tap);
		padding-block: var(--space-4);
		font-family: var(--font-display);
		font-size: var(--text-h2);
		line-height: 1.1;
	}
	.menu-book {
		margin-top: var(--space-6);
	}
	@media (max-width: 900px) {
		.links,
		.book {
			display: none;
		}
		.menu-button {
			display: inline-flex;
		}
	}
</style>
