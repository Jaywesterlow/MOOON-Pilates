import { site, type Faq, type Locale, type Price, type Studio } from './studio';

type Page = { locale: Locale; url: string; title: string; description: string };

/**
 * schema.org for the page, generated from the same object the page renders:
 * the studio as an ExerciseGym (address, hours, prices as Offers), the FAQ as a FAQPage,
 * and the WebPage that carries the page's language.
 */
export function studioSchema(studio: Studio, prices: Price[], faq: Faq[], page: Page) {
	const id = `${site.origin}/#studio`;

	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'ExerciseGym',
				'@id': id,
				name: studio.fullName,
				url: studio.url,
				...(studio.email ? { email: studio.email } : {}),
				...(studio.whatsapp.schema ? { telephone: studio.whatsapp.schema } : {}),
				address: {
					'@type': 'PostalAddress',
					...(studio.address.street ? { streetAddress: studio.address.street } : {}),
					...(studio.address.postalCode ? { postalCode: studio.address.postalCode } : {}),
					addressLocality: studio.address.city,
					addressCountry: studio.address.country
				},
				sameAs: studio.socials.map((social) => social.href),
				openingHoursSpecification: studio.hours.map((block) => ({
					'@type': 'OpeningHoursSpecification',
					dayOfWeek: block.schemaDays,
					opens: block.opens,
					closes: block.closes
				})),
				makesOffer: prices.map((price) => ({
					'@type': 'Offer',
					name: price.name,
					description: price.detail,
					price: price.amount.toFixed(2),
					priceCurrency: 'EUR'
				}))
			},
			{
				'@type': 'FAQPage',
				'@id': `${page.url}#faq`,
				inLanguage: page.locale,
				mainEntity: faq.map((item) => ({
					'@type': 'Question',
					name: item.question,
					acceptedAnswer: { '@type': 'Answer', text: item.answer }
				}))
			},
			{
				'@type': 'WebPage',
				'@id': page.url,
				url: page.url,
				name: page.title,
				description: page.description,
				inLanguage: page.locale,
				about: { '@id': id }
			}
		]
	};
}
