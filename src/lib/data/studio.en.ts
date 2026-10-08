import type { Copy } from './studio';

/**
 * English at `/en`. Facts (address, hours, prices, photos) live in `studio.ts`.
 * Translated from MOOON's Dutch; their English taglines are their own words.
 */
export const en: Copy = {
	lang: 'en',
	title: 'MOOON Pilates Spijkenisse · Reformer pilates',
	description:
		'Certified reformer pilates studio in Spijkenisse. Classical and Contemporary Pilates, for beginners and advanced. Open every day from 07:00 to 23:00. Start with Meet the reformer, €25.',
	hoursLabel: 'Monday to Sunday',
	opening: {
		openUntil: 'Open today until',
		opensToday: 'Open today from',
		opensTomorrow: 'Open tomorrow from',
		fallback: 'Open every day, 07:00 – 23:00'
	},
	navLinks: ['Classes', 'Prices', 'Questions', 'Visit'],
	trust: [
		'Certified studio',
		'Certified instructors',
		'Classical and Contemporary Pilates',
		'For beginners and advanced'
	],
	benefits: [
		{
			title: 'A stronger body',
			line: 'You build strength without it ever feeling heavy or straining.'
		},
		{
			title: 'More freedom of movement',
			line: 'Your body grows more supple. Everything feels lighter and more natural.'
		},
		{
			title: 'Posture and body awareness',
			line: 'A better posture, and more confidence in how you move every day.'
		}
	],
	offer: [
		{
			title: 'Reformer Pilates',
			line: 'Elegant strength and control, for a stronger and more aware body.',
			alt: 'A ball held between the knees on the reformer'
		},
		{
			title: 'E-Reformer',
			line: 'Train on your own with a video class on your own screen. 50 minutes, one credit.',
			alt: 'A woman on the E-Reformer choosing her workout on the screen'
		},
		{
			title: 'Bodyroll',
			line: 'Stimulates your body, gets the circulation going and helps you recover.',
			alt: 'The wooden bamboo rollers of the Bodyroll'
		},
		{
			title: 'ĀYU HOUSE',
			line: 'Ceremonial matcha from Japan, for focus, calm and natural energy.',
			alt: 'A glass of green matcha held in two hands'
		},
		{
			title: 'Academy',
			line: 'Become a certified Reformer Pilates instructor. Eight training days.',
			alt: 'The foot bar of a reformer in the studio'
		}
	],
	steps: [
		{
			title: 'Sign up',
			line: 'Leave your name and email address. We create an account for you and send you the login details.'
		},
		{
			title: 'Book Meet the reformer',
			line: 'Choose your first class in the MOOON Pilates app. Made for everyone who is new to reformer pilates.'
		},
		{
			title: 'We guide you',
			line: 'We take you through it step by step, so you feel safe, seen and at ease.'
		}
	],
	bring: [
		'Comfortable sportswear',
		'Grip socks',
		'Preferably no heavy meal beforehand',
		'A towel and water, if you like'
	],
	prices: [
		{
			name: 'Meet the reformer',
			detail:
				'Your trial class. We take you through it step by step, so you feel comfortable and confident.'
		},
		{
			name: 'Try-out, 3 classes',
			detail: 'Get to know the reformer better and feel what it does for your body.'
		},
		{ name: 'Class card, 10 classes', detail: 'Valid for 3 months.' },
		{ name: 'Class card, 20 classes', detail: 'Valid for 6 months.' },
		{
			name: 'Unlimited',
			detail: 'Unlimited access to all classes.',
			period: 'per month'
		}
	],
	studio: [
		'A woman laughing on the sofa in the studio',
		'Matcha by the plant, eyes closed',
		'The lit niche with candles and greenery',
		'At ease on the studio floor, with a glass of matcha'
	],
	occasions: ['Private classes', 'Birthdays', 'Company outings', 'Workshops', 'Events'],
	faq: [
		{
			group: 'Reformer pilates',
			items: [
				{
					question: 'Do I need experience for reformer pilates?',
					answer:
						'No, the classes suit beginners and advanced alike. We guide you step by step and adjust the level to your body and experience.'
				},
				{
					question: 'What are the benefits of reformer pilates?',
					answer:
						'Reformer pilates strengthens your muscles, improves your posture and gives you more flexibility and control in your body.'
				},
				{
					question: 'How often should I do reformer pilates?',
					answer: 'For the best results we advise 1-3 times a week, depending on your goals.'
				}
			]
		},
		{
			group: 'Bodyroll',
			items: [
				{
					question: 'What is a Bodyroll session?',
					answer:
						'A Bodyroll session is a form of lymphatic drainage and deep connective tissue massage in which rotating bamboo rollers massage your body step by step. The session stimulates circulation, helps clear waste products and supports muscle recovery.'
				},
				{
					question: 'Does it hurt?',
					answer:
						'No, though it may feel sensitive. The intensity is fully adjustable on the control panel. You set the speed and the warmth yourself, and we guide you through your first session so you know exactly what you are doing.'
				},
				{
					question: 'How long does a session take?',
					answer: 'A complete Bodyroll session takes 45 minutes on average.'
				}
			]
		}
	],
	ui: {
		nav: {
			label: 'Main',
			book: 'Book a trial class',
			menu: 'Menu',
			close: 'Close',
			language: 'Language'
		},
		hero: {
			lines: ['Move slowly,', 'feel deeply'],
			book: 'Book a trial class',
			alt: 'The MOOON reformer room in warm light, with a screen at every reformer'
		},
		statement: { lines: ['Where strength', 'meets softness'], label: 'About the studio' },
		about: {
			label: 'Reformer pilates',
			lines: ['What is reformer pilates?'],
			lede: 'Controlled, flowing movements work deep into your body. Strength, flexibility and balance, without it ever feeling heavy or straining.',
			alt: 'A reformer up close, with the shoulder rests and the foot bar'
		},
		offer: {
			label: 'Classes',
			lines: ['A space designed for you'],
			lede: 'Movement, recovery and a moment of calm, under one roof.',
			more: 'Read more'
		},
		first: {
			label: 'Getting started',
			lines: ['Your first class'],
			lede: 'No rush, no musts. Just a moment for yourself.',
			bring: 'Bring',
			book: 'Book Meet the reformer',
			app: 'After that you book in the MOOON Pilates app (Android) or the Virtuagym app (Apple).'
		},
		prices: {
			label: 'Rates',
			lines: ['Prices'],
			lede: 'Reformer pilates. An E-Reformer session costs one credit, just like a class.',
			perClass: 'per class',
			book: 'Book your trial class',
			note: 'Pay by debit card, iDEAL, credit card, cash, gift card or in instalments.'
		},
		founders: {
			label: 'Founders',
			lines: ['Created with intention.', 'Built with care'],
			body: 'What grew here started as a personal longing. A longing for more calm, more balance, and a place where you can truly let go of everything for a while.',
			quote: 'What started as a personal need, became a place for others to feel.',
			signature: 'With love and gratitude,',
			names: 'Anjali, Nasrien and Monica',
			alt: 'Two women at the round table in the studio, with a laptop and candles'
		},
		studio: {
			label: 'The studio',
			lines: ['A soft way', 'to feel strong'],
			lede: 'A place where you leave the rush of the day behind. Warm light, calm colours and a serene space.',
			moonLabel: 'A full moon in MOOON’s colour fills the screen'
		},
		more: {
			label: 'More than a studio',
			lines: ['A space to connect'],
			body: 'Besides our reformer classes, we open our doors for private classes, birthdays, company outings, workshops and exclusive events. We are happy to think along with you.',
			contact: 'Get in touch',
			alt: 'Two women laughing together at a table in the studio'
		},
		faq: { label: 'Questions', lines: ['Frequently asked questions'] },
		visit: {
			label: 'Visit',
			lines: ['A moment for you,', 'every day'],
			find: 'Address',
			hours: 'Opening hours',
			contact: 'Contact',
			whatsapp: 'WhatsApp',
			route: 'Directions',
			alt: 'The front of MOOON'
		},
		closing: { label: 'Trial class', book: 'Book Meet the reformer' },
		footer: {
			tagline: 'Soft where you need it. Strong where it matters.',
			book: 'Book a trial class',
			top: 'Back to top',
			privacy: 'Privacy policy',
			houseRules: 'House rules',
			terms: 'Terms and conditions',
			credit: 'Concept demo · JW Creative'
		},
		demo: {
			title: 'This is a concept demo.',
			book: 'On the real site, this is where you book your trial class. This demo takes no bookings.',
			link: 'On the real site this link goes on. This demo stays here.',
			toForm: 'Go to the sign-up form',
			follow: 'Follow the link anyway',
			portfolioBook: 'On the real site, this is where you book your trial class. This is a portfolio demo by JW Creative: booking only works on MOOON’s real site.',
			portfolioLink: 'On the real site this link goes on. This is a portfolio demo by JW Creative, so it stops here.',
			close: 'Close'
		}
	}
};
