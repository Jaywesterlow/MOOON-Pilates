<script lang="ts">
	import { resolve } from '$app/paths';
	import { site, type Locale } from '$lib/data/studio';

	/**
	 * One link to the other language, named by its own code, in the bar's link style. A full page
	 * load on purpose: `<html lang>` and the reveals start clean.
	 */
	type Props = { locale: Locale };
	let { locale }: Props = $props();

	const other = $derived<Locale>(locale === 'nl' ? 'en' : 'nl');
	const href = $derived(resolve('/[[lang=locale]]', { lang: other === 'nl' ? undefined : other }));
</script>

<a
	class="link label tap"
	{href}
	hreflang={other}
	lang={other}
	aria-label={site.languages[other].name}
	data-sveltekit-reload
>
	{site.languages[other].code}
</a>
