import type { PhotoKey } from '$lib/assets/photos';
import { en } from './studio.en';
import { nl } from './studio.nl';

/**
 * The content of the site. Facts that read the same in every language live here once;
 * the words live in `studio.nl.ts` and `studio.en.ts`. `content[locale]` joins them,
 * so the page, the "open today" line and the JSON-LD can never drift apart between languages.
 *
 * Every fact comes from mooonpilates.nl (scraped with Firecrawl on 1 October 2026).
 */

export const locales = ['nl', 'en'] as const;
export type Locale = (typeof locales)[number];

/** `/` is Dutch, `/en` is English. Anything else falls back to Dutch. */
export function localeFrom(param: string | undefined): Locale {
	return param === 'en' ? 'en' : 'nl';
}

export const site = {
	/** Assumed production URL of the demo; change it here once Vercel has one. */
	origin: 'https://mooon-pilates.vercel.app',
	paths: { nl: '/', en: '/en' } satisfies Record<Locale, string>,
	languages: {
		nl: { code: 'NL', name: 'Nederlands' },
		en: { code: 'EN', name: 'English' }
	} satisfies Record<Locale, { code: string; name: string }>
};

export type Hours = {
	/** 0 = Sunday … 6 = Saturday, as Date.getDay() returns them */
	days: number[];
	schemaDays: string[];
	opens: string;
	closes: string;
};

/** Language-neutral facts: the same on every page and in the JSON-LD. */
export const facts = {
	name: 'MOOON Pilates',
	fullName: 'MOOON Pilates Spijkenisse',
	url: 'https://mooonpilates.nl/',
	/**
	 * Booking today: a Google form ("proefles boeken"), after which MOOON makes an account in
	 * the Virtuagym app. Their site links the form's /edit URL, which shows "Request edit access";
	 * the demo links the form's public /viewform URL instead (not checked from here).
	 * Every booking link keeps this as its href, for visitors without JavaScript and for a new tab;
	 * a plain click opens the demo dialog, so the demo can never take a real booking.
	 */
	booking: {
		url: 'https://docs.google.com/forms/d/1Iac0tKM0_6hmCPMBvERE96OpbaqkdLAbAa9h7t0NpS0/viewform',
		android:
			'https://play.google.com/store/apps/details?id=digifit.android.virtuagym.pro.mooonpilates',
		apple: 'https://apps.apple.com/us/app/virtuagym-fitness-workouts/id808207399'
	},
	email: 'info@mooonpilates.nl',
	whatsapp: {
		display: '0181 201212',
		href: 'https://wa.me/31181201212',
		schema: '+31181201212'
	},
	address: {
		street: 'Zuidpassage 24',
		postalCode: '3201 DG',
		city: 'Spijkenisse',
		country: 'NL',
		maps: 'https://maps.google.com/?q=Zuidpassage+24,+3201+DG+Spijkenisse'
	},
	socials: [
		{ name: 'Instagram', href: 'https://www.instagram.com/mooonpilates.spijkenisse/' },
		{ name: 'TikTok', href: 'https://www.tiktok.com/@mooonpilates.spijkenisse' },
		{ name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61576638060125' }
	],
	/** As linked in their footer. The terms still carry the old name, Detox and Roll Studio. */
	legal: {
		privacy: 'https://mooonpilates.nl/privacy-policy-2',
		houseRules:
			'https://mooonpilates.nl/wp-content/uploads/2025/05/algemene-huisregelsveiligheid.pdf',
		terms:
			'https://mooonpilates.nl/wp-content/uploads/2025/09/Algemene-voorwaarden-Detox-and-Roll-Studio.pdf'
	}
};

export type Facts = typeof facts;

/** Open every day, 07:00 – 23:00 (reformer-pilates page). */
export const openingHours: Hours[] = [
	{
		days: [0, 1, 2, 3, 4, 5, 6],
		schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		opens: '07:00',
		closes: '23:00'
	}
];

/**
 * Reformer pilates prices from mooonpilates.nl/prijzen-en-faqs (1 October 2026).
 * "Meet the reformer" and "Proefles" are both €25 there and describe the same first class;
 * the demo shows them as one. The "Early Founders" offer ran until 1 September and is left out.
 * Recheck every price with MOOON before this goes live.
 */
const priceFacts = [
	{ id: 'meet', amount: 25, perClass: null, featured: true },
	{ id: 'tryout', amount: 55, perClass: null, featured: false },
	{ id: 'ten', amount: 185, perClass: 18.5, featured: false },
	{ id: 'twenty', amount: 345, perClass: 17.25, featured: false },
	{ id: 'unlimited', amount: 195, perClass: null, featured: false }
] as const satisfies readonly {
	id: string;
	amount: number;
	perClass: number | null;
	featured: boolean;
}[];

const offerFacts = [
	{ href: 'https://mooonpilates.nl/reformer-pilates/', photo: 'offerReformer' },
	{ href: 'https://mooonpilates.nl/e-reformer/', photo: 'offerEReformer' },
	{ href: 'https://mooonpilates.nl/the-rollshape/', photo: 'offerBodyroll' },
	{ href: 'https://mooonpilates.nl/ayu-house/', photo: 'offerAyu' },
	{ href: 'https://mooonpilates.nl/reformer-pilates-academy/', photo: 'offerAcademy' }
] as const satisfies readonly { href: string; photo: PhotoKey }[];

const studioFacts = [
	{ photo: 'studio1' },
	{ photo: 'studio2' },
	{ photo: 'studio3' }
] as const satisfies readonly { photo: PhotoKey }[];

const navFacts = ['#offer', '#prices', '#faq', '#visit'] as const;

/** One entry of words for each fact, in the same order: the tuple types keep the counts equal. */
type WordsFor<T extends readonly unknown[], W> = { [K in keyof T]: W };

/** The words for the "open today" line, see `opening.ts`. */
export type OpeningWords = {
	/** "Today open until" */
	openUntil: string;
	/** "Today open from" (before opening time) */
	opensToday: string;
	/** "Tomorrow open from" (after closing time) */
	opensTomorrow: string;
	/** before the clock starts (prerendered HTML) */
	fallback: string;
};

export type Faq = { question: string; answer: string };

/** Everything in one language. Each locale file is checked against this type. */
export type Copy = {
	lang: Locale;
	title: string;
	description: string;
	hoursLabel: string;
	opening: OpeningWords;
	navLinks: WordsFor<typeof navFacts, string>;
	trust: string[];
	benefits: { title: string; line: string }[];
	offer: WordsFor<typeof offerFacts, { title: string; line: string; alt: string }>;
	steps: { title: string; line: string }[];
	bring: string[];
	prices: WordsFor<typeof priceFacts, { name: string; detail: string; period?: string }>;
	studio: WordsFor<typeof studioFacts, string>;
	occasions: string[];
	faq: { group: string; items: Faq[] }[];
	ui: {
		nav: { label: string; book: string; menu: string; close: string; language: string };
		hero: { lines: string[]; lede: string; book: string; alt: string };
		trust: { label: string };
		about: { lines: string[]; lede: string; alt: string };
		offer: { lines: string[]; lede: string; more: string };
		first: { lines: string[]; lede: string; bring: string; book: string; app: string };
		prices: { lines: string[]; lede: string; perClass: string; book: string; note: string };
		founders: {
			lines: string[];
			body: string;
			quote: string;
			signature: string;
			names: string;
			alt: string;
		};
		studio: { lines: string[]; lede: string; moonAlt: string };
		more: { lines: string[]; sub: string; body: string; contact: string; alt: string };
		faq: { lines: string[] };
		visit: {
			lines: string[];
			find: string;
			hours: string;
			contact: string;
			whatsapp: string;
			route: string;
			book: string;
			alt: string;
		};
		footer: {
			tagline: string;
			book: string;
			top: string;
			privacy: string;
			houseRules: string;
			terms: string;
			credit: string;
		};
		demo: { title: string; line: string; link: string; close: string };
	};
};

export type UI = Copy['ui'];

export type Price = {
	id: string;
	amount: number;
	perClass: number | null;
	featured: boolean;
	name: string;
	detail: string;
	period?: string;
};

export type Offer = { href: string; photo: PhotoKey; title: string; line: string; alt: string };

export type StudioPhoto = { photo: PhotoKey; alt: string };

export type NavLink = { href: string; label: string };

function compose(copy: Copy) {
	const studio = {
		...facts,
		title: copy.title,
		description: copy.description,
		hours: openingHours,
		hoursLabel: copy.hoursLabel
	};

	return {
		locale: copy.lang,
		studio,
		opening: copy.opening,
		ui: copy.ui,
		navLinks: navFacts.map((href, i): NavLink => ({ href, label: copy.navLinks[i] })),
		trust: copy.trust,
		benefits: copy.benefits,
		offer: offerFacts.map((item, i): Offer => ({ ...item, ...copy.offer[i] })),
		steps: copy.steps,
		bring: copy.bring,
		prices: priceFacts.map((price, i): Price => ({ ...price, ...copy.prices[i] })),
		studioPhotos: studioFacts.map((item, i): StudioPhoto => ({ ...item, alt: copy.studio[i] })),
		occasions: copy.occasions,
		faq: copy.faq
	};
}

export type Content = ReturnType<typeof compose>;
export type Studio = Content['studio'];

export const content: Record<Locale, Content> = { nl: compose(nl), en: compose(en) };

/** €25, €18,50 (nl) or €18.50 (en): whole euros without cents, as MOOON writes them. */
export function euro(amount: number, locale: Locale): string {
	const text = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
	return '€' + (locale === 'nl' ? text.replace('.', ',') : text);
}
