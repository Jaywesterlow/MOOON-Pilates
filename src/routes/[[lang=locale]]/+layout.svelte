<script lang="ts">
	import 'lenis/dist/lenis.css';
	import '../../app.css';

	import { prefersReducedMotion } from 'svelte/motion';
	import { DemoDialog, Footer, Nav } from '$lib';
	import favicon from '$lib/assets/favicon.svg';
	import { locales, site } from '$lib/data/studio';
	import { studioSchema } from '$lib/data/schema';
	import { holdScroll, refreshWhenSettled, startSmoothScroll } from '$lib/motion/scroll';
	import { demo } from '$lib/state/demo.svelte';
	import { opening } from '$lib/state/opening.svelte';

	let { data, children } = $props();

	const absolute = (path: string) => site.origin + path;

	const canonical = $derived(absolute(site.paths[data.locale]));

	// closing tag split in two: a literal one would end this script block
	const schemaTag = $derived(
		'<script type="application/ld+json">' +
			JSON.stringify(
				studioSchema(
					data.studio,
					data.prices,
					data.faq.flatMap((group) => group.items),
					{
						locale: data.locale,
						url: canonical,
						title: data.studio.title,
						description: data.studio.description
					}
				)
			) +
			'</' +
			'script>'
	);

	// the clock behind "open today": starts in the browser, stops when the layout goes
	$effect(() => opening.start());

	// smooth scroll only for visitors who did not ask for less motion; flips live with the setting
	$effect(() => {
		if (prefersReducedMotion.current) return;
		return startSmoothScroll();
	});

	$effect(() => refreshWhenSettled());

	// the page behind the demo dialog stays where it is
	$effect(() => holdScroll(demo.isOpen));
</script>

<svelte:head>
	<title>{data.studio.title}</title>
	<meta name="description" content={data.studio.description} />
	<link rel="canonical" href={canonical} />
	{#each locales as locale (locale)}
		<link rel="alternate" hreflang={locale} href={absolute(site.paths[locale])} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={absolute(site.paths.nl)} />
	<link rel="icon" href={favicon} />
	<meta property="og:title" content={data.studio.title} />
	<meta property="og:description" content={data.studio.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:locale" content={data.locale === 'nl' ? 'nl_NL' : 'en_GB'} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- our own data, serialised as JSON -->
	{@html schemaTag}
</svelte:head>

<Nav studio={data.studio} links={data.navLinks} text={data.ui.nav} locale={data.locale} />

<main>
	{@render children()}
</main>

<Footer studio={data.studio} text={data.ui.footer} locale={data.locale} />

<DemoDialog text={data.ui.demo} />
