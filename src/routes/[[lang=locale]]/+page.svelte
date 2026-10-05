<script lang="ts">
	import {
		About,
		Closing,
		Faq,
		FirstClass,
		Founders,
		Hero,
		Moon,
		More,
		Offer,
		Prices,
		Statement,
		Studio,
		Visit
	} from '$lib';

	let { data } = $props();

	const featured = $derived(data.prices.find((price) => price.featured) ?? data.prices[0]);
</script>

<!-- the section map (docs/recept.md): C C A G F G L A G A A G C -->
<Hero studio={data.studio} text={data.ui.hero} words={data.opening} />
<Statement text={data.ui.statement} items={data.trust} />
<About text={data.ui.about} benefits={data.benefits} />
<Offer items={data.offer} text={data.ui.offer} />
<!-- the signature: the moon rises and takes the screen; the first class and the prices sit on its colour -->
<Moon label={data.ui.studio.moonLabel} />
<FirstClass studio={data.studio} steps={data.steps} bring={data.bring} text={data.ui.first} />
<Prices studio={data.studio} prices={data.prices} text={data.ui.prices} locale={data.locale} />
<Founders text={data.ui.founders} />
<Studio items={data.studioPhotos} text={data.ui.studio} />
<More studio={data.studio} occasions={data.occasions} text={data.ui.more} />
<Faq groups={data.faq} text={data.ui.faq} />
<Visit studio={data.studio} text={data.ui.visit} words={data.opening} />
<Closing
	studio={data.studio}
	price={featured}
	text={data.ui.closing}
	alt={data.ui.visit.alt}
	locale={data.locale}
/>
