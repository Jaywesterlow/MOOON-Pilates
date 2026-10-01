<script lang="ts">
	import {
		About,
		Faq,
		FirstClass,
		Founders,
		Hero,
		More,
		Offer,
		Prices,
		Studio,
		Trust,
		Visit
	} from '$lib';

	let { data } = $props();
</script>

<Hero studio={data.studio} text={data.ui.hero} words={data.opening} />
<Trust items={data.trust} label={data.ui.trust.label} />
<About text={data.ui.about} benefits={data.benefits} />
<Offer items={data.offer} text={data.ui.offer} />
<FirstClass studio={data.studio} steps={data.steps} bring={data.bring} text={data.ui.first} />
<Prices studio={data.studio} prices={data.prices} text={data.ui.prices} locale={data.locale} />
<Founders text={data.ui.founders} />
<Studio items={data.studioPhotos} text={data.ui.studio} />
<More studio={data.studio} occasions={data.occasions} text={data.ui.more} />
<Faq groups={data.faq} text={data.ui.faq} />
<Visit studio={data.studio} text={data.ui.visit} words={data.opening} />
