<script lang="ts">
	import { fade } from 'svelte/transition';
	import { innerHeight, scrollY } from 'svelte/reactivity/window';
	import type { Locale, NavLink, Studio, UI } from '$lib/data/studio';
	import { booking } from '$lib/state/booking.svelte';
	import Button from './Button.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import Logo from './Logo.svelte';

	type Props = { studio: Studio; links: NavLink[]; text: UI['nav']; locale: Locale };
	let { studio, links, text, locale }: Props = $props();

	let menuOpen = $state(false);

	/** the hero carries the logo large; the small one in the bar appears once that one has gone */
	const pastHero = $derived((scrollY.current ?? 0) > (innerHeight.current ?? Infinity) * 0.6);
</script>

<nav class={['nav', { solid: pastHero || menuOpen }]} aria-label={text.label}>
	<a
		class="brand"
		href="#top"
		onclick={() => (menuOpen = false)}
		aria-hidden={!pastHero && !menuOpen ? 'true' : undefined}
		tabindex={!pastHero && !menuOpen ? -1 : undefined}
	>
		<Logo alt={studio.name} eager />
	</a>

	<div class="links">
		{#each links as link (link.href)}
			<a class="ul tap label" href={link.href}>{link.label}</a>
		{/each}
	</div>

	<div class="right">
		<LangSwitch {locale} label={text.language} />
		<div class="book">
			<Button
				href={studio.booking.url}
				onclick={booking.open}
				variant="outline"
				size="sm"
				arrow={false}
			>
				{text.book}
			</Button>
		</div>
		<button
			class="burger tap label"
			aria-expanded={menuOpen}
			aria-controls="menu"
			onclick={() => (menuOpen = !menuOpen)}
		>
			{menuOpen ? text.close : text.menu}
		</button>
	</div>
</nav>

{#if menuOpen}
	<div class="menu" id="menu" transition:fade={{ duration: 300 }}>
		{#each links as link (link.href)}
			<a class="tap" href={link.href} onclick={() => (menuOpen = false)}>{link.label}</a>
		{/each}
		<div class="menu-book">
			<Button
				href={studio.booking.url}
				onclick={(event) => {
					menuOpen = false;
					booking.open(event);
				}}
				arrow={false}
			>
				{text.book}
			</Button>
		</div>
	</div>
{/if}

<style>
	.nav {
		--logo-h: 1.75rem;

		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		height: calc(var(--nav-h) + env(safe-area-inset-top, 0px));
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-5);
		padding: env(safe-area-inset-top, 0px) var(--gutter) 0;
		color: var(--night);
		transition:
			background 0.35s,
			box-shadow 0.35s;
	}
	.solid {
		background: color-mix(in srgb, var(--paper) 92%, transparent);
		backdrop-filter: blur(12px);
		box-shadow: 0 1px 0 color-mix(in srgb, var(--line) 60%, transparent);
	}
	.brand {
		display: inline-flex;
		align-items: center;
		min-height: var(--tap);
		opacity: 0;
		transition: opacity 0.35s;
	}
	.solid .brand {
		opacity: 1;
	}
	.links {
		display: flex;
		gap: var(--space-6);
	}
	.right {
		display: flex;
		align-items: center;
		gap: var(--space-5);
	}
	.burger {
		display: none;
		background: none;
		border: 0;
		color: inherit;
		font-family: var(--font-body);
		padding: 0;
		margin: 0;
		cursor: pointer;
	}
	.menu {
		position: fixed;
		inset: 0;
		z-index: 40;
		background: var(--paper);
		color: var(--night);
		display: grid;
		place-content: center;
		justify-items: center;
		text-align: center;
		gap: var(--space-4);
	}
	.menu a {
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
		.burger {
			display: inline-flex;
		}
	}
</style>
