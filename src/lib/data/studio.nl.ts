import type { Copy } from './studio';

/**
 * Nederlands, de standaard op `/`. Feiten (adres, tijden, prijzen, foto's) staan in `studio.ts`.
 * Elke zin komt van mooonpilates.nl, ingekort waar dat kon. MOOON's Engelse taglines blijven
 * Engels, zoals op hun eigen site.
 */
export const nl: Copy = {
	lang: 'nl',
	title: 'MOOON Pilates Spijkenisse · Reformer pilates',
	description:
		'Gecertificeerde reformer pilates studio in Spijkenisse. Classical en Contemporary Pilates, voor beginners en gevorderden. Elke dag open van 07:00 tot 23:00. Begin met Meet the reformer, €25.',
	hoursLabel: 'Maandag t/m zondag',
	opening: {
		openUntil: 'Vandaag open tot',
		opensToday: 'Vandaag open vanaf',
		opensTomorrow: 'Morgen open vanaf',
		fallback: 'Elke dag open, 07:00 – 23:00'
	},
	navLinks: ['Aanbod', 'Prijzen', 'Vragen', 'Contact'],
	trust: [
		'Gecertificeerde studio',
		'Gecertificeerde instructeurs',
		'Classical en Contemporary Pilates',
		'Voor beginners en gevorderden'
	],
	benefits: [
		{
			title: 'Een sterker lichaam',
			line: 'Je bouwt kracht op zonder dat het zwaar of belastend aanvoelt.'
		},
		{
			title: 'Meer bewegingsvrijheid',
			line: 'Je lichaam wordt soepeler. Alles voelt lichter en natuurlijker.'
		},
		{
			title: 'Houding en lichaamsbewustzijn',
			line: 'Een betere houding, en meer vertrouwen in je dagelijkse bewegingen.'
		}
	],
	offer: [
		{
			title: 'Reformer Pilates',
			line: 'Elegante kracht en controle, voor een sterker en bewuster lichaam.',
			alt: 'Een bal tussen de knieën op de reformer'
		},
		{
			title: 'E-Reformer',
			line: 'Zelfstandig trainen met een videoles op je eigen scherm. 50 minuten, één credit.',
			alt: 'Een vrouw op de E-Reformer kiest haar training op het scherm'
		},
		{
			title: 'Bodyroll',
			line: 'Stimuleert je lichaam, activeert de doorbloeding en helpt bij herstel.',
			alt: 'De houten bamboerollers van de Bodyroll'
		},
		{
			title: 'ĀYU HOUSE',
			line: 'Ceremoniële matcha uit Japan, voor focus, rust en natuurlijke energie.',
			alt: 'Een glas groene matcha in twee handen'
		},
		{
			title: 'Academy',
			line: 'Word gecertificeerd Reformer Pilates instructeur. Acht opleidingsdagen.',
			alt: 'De voetbalk van een reformer in de studio'
		}
	],
	steps: [
		{
			title: 'Meld je aan',
			line: 'Laat je naam en e-mailadres achter. Wij maken een account voor je aan en sturen je de inloggegevens.'
		},
		{
			title: 'Boek Meet the reformer',
			line: 'Kies je eerste les in de MOOON Pilates app. Bedoeld voor iedereen die nieuw is met reformer pilates.'
		},
		{
			title: 'Wij begeleiden je',
			line: 'We nemen je stap voor stap mee, zodat je je veilig, gezien en op je gemak voelt.'
		}
	],
	bring: [
		'Comfortabele sportkleding',
		'Sokken met grip',
		'Liever geen zware maaltijd vooraf',
		'Eventueel een handdoek en water'
	],
	prices: [
		{
			name: 'Meet the reformer',
			detail:
				'Je proefles. We nemen je stap voor stap mee, zodat je je comfortabel en zelfverzekerd voelt.'
		},
		{
			name: 'Try-out, 3 lessen',
			detail: 'Leer de reformer beter kennen en voel wat het met je lichaam doet.'
		},
		{ name: 'Rittenkaart, 10 lessen', detail: '3 maanden geldig.' },
		{ name: 'Rittenkaart, 20 lessen', detail: '6 maanden geldig.' },
		{
			name: 'Unlimited',
			detail: 'Onbeperkt toegang tot alle lessen.',
			period: 'per maand'
		}
	],
	studio: [
		'Een vrouw lacht op de bank in de studio',
		'Matcha bij de plant, met de ogen dicht',
		'De verlichte nis met kaarsen en groen',
		'Ontspannen op de vloer van de studio, met een glas matcha'
	],
	occasions: ['Privélessen', 'Verjaardagen', 'Bedrijfsuitjes', 'Workshops', 'Evenementen'],
	faq: [
		{
			group: 'Reformer pilates',
			items: [
				{
					question: 'Moet ik ervaring hebben voor reformer pilates?',
					answer:
						'Nee, de lessen zijn geschikt voor zowel beginners als gevorderden. We begeleiden je stap voor stap en passen het niveau aan op jouw lichaam en ervaring.'
				},
				{
					question: 'Wat zijn de voordelen van reformer pilates?',
					answer:
						'Reformer pilates versterkt je spieren, verbetert je houding en zorgt voor meer flexibiliteit en controle in je lichaam.'
				},
				{
					question: 'Hoe vaak moet ik reformer pilates doen?',
					answer:
						'Voor het beste resultaat adviseren we 1-3 keer per week, afhankelijk van jouw doelen.'
				}
			]
		},
		{
			group: 'Bodyroll',
			items: [
				{
					question: 'Wat is een Bodyroll sessie?',
					answer:
						'Een Bodyroll sessie is een vorm van lymfedrainage en diepe bindweefselmassage waarbij je lichaam stap voor stap wordt gemasseerd door roterende bamboerollen. De sessie stimuleert de doorbloeding, helpt afvalstoffen af te voeren en bevordert spierherstel.'
				},
				{
					question: 'Is het pijnlijk?',
					answer:
						'Nee, misschien gevoelig. De intensiteit is volledig aan te passen via het bedieningspaneel. Je bepaalt zelf de snelheid en warmte, en wij begeleiden je tijdens je eerste sessie zodat je precies weet wat je doet.'
				},
				{
					question: 'Hoe lang duurt een sessie?',
					answer: 'Een complete bodyroll sessie duurt gemiddeld 45 minuten.'
				}
			]
		}
	],
	ui: {
		nav: {
			label: 'Hoofdmenu',
			book: 'Boek een proefles',
			menu: 'Menu',
			close: 'Sluiten',
			language: 'Taal'
		},
		hero: {
			lines: ['Move slowly,', 'feel deeply'],
			book: 'Boek een proefles',
			alt: 'De reformerzaal van MOOON in warm licht, met een scherm bij elke reformer'
		},
		statement: { lines: ['Where strength', 'meets softness'], label: 'Over de studio' },
		about: {
			label: 'Reformer pilates',
			lines: ['Wat is reformer pilates?'],
			lede: 'Door gecontroleerde, vloeiende bewegingen werk je diep aan je lichaam. Aan kracht, flexibiliteit en balans, zonder dat het zwaar of belastend aanvoelt.',
			alt: 'Een reformer van dichtbij, met de schouderkussens en de voetbalk'
		},
		offer: {
			label: 'Aanbod',
			lines: ['A space designed for you'],
			lede: 'Beweging, herstel en een moment van rust, onder één dak.',
			more: 'Lees meer'
		},
		first: {
			label: 'Beginnen',
			lines: ['Je eerste les'],
			lede: 'Geen haast, geen moeten. Alleen een moment voor jezelf.',
			bring: 'Neem mee',
			book: 'Boek Meet the reformer',
			app: 'Boeken gaat daarna via de MOOON Pilates app (Android) of de Virtuagym app (Apple).'
		},
		prices: {
			label: 'Tarieven',
			lines: ['Prijzen'],
			lede: 'Reformer pilates. Een E-Reformer sessie kost één credit, net als een les.',
			perClass: 'per les',
			book: 'Boek je proefles',
			note: 'Betalen kan met pin, iDEAL, creditcard, contant, cadeaubon of in termijnen.'
		},
		founders: {
			label: 'Oprichters',
			lines: ['Created with intention.', 'Built with care'],
			body: 'Wat hier is ontstaan, begon ooit als een persoonlijk verlangen. Een verlangen naar meer rust, meer balans en een plek waar je echt even loskomt van alles.',
			quote: 'What started as a personal need, became a place for others to feel.',
			signature: 'With love and gratitude,',
			names: 'Anjali, Nasrien en Monica',
			alt: 'Twee vrouwen aan de ronde tafel in de studio, met een laptop en kaarsen'
		},
		studio: {
			label: 'De studio',
			lines: ['A soft way', 'to feel strong'],
			lede: 'Een plek waar je de drukte van de dag achter je laat. Warme sfeerverlichting, rustige kleuren en een serene omgeving.',
			moonLabel: 'Een volle maan in de kleur van MOOON vult het scherm'
		},
		more: {
			label: 'Meer dan een studio',
			lines: ['A space to connect'],
			body: 'Naast de reformer lessen openen we onze deuren ook voor privélessen, verjaardagen, bedrijfsuitjes, workshops en exclusieve evenementen. We denken graag met je mee.',
			contact: 'Neem contact op',
			alt: 'Twee vrouwen lachen samen aan tafel in de studio'
		},
		faq: { label: 'Vragen', lines: ['Veelgestelde vragen'] },
		visit: {
			label: 'Bezoek',
			lines: ['A moment for you,', 'every day'],
			find: 'Adres',
			hours: 'Openingstijden',
			contact: 'Contact',
			whatsapp: 'WhatsApp',
			route: 'Route',
			alt: 'De voorgevel van MOOON'
		},
		closing: { label: 'Proefles', book: 'Boek Meet the reformer' },
		footer: {
			tagline: 'Soft where you need it. Strong where it matters.',
			book: 'Proefles boeken',
			top: 'Naar boven',
			privacy: 'Privacybeleid',
			houseRules: 'Huisregels',
			terms: 'Algemene voorwaarden',
			credit: 'Conceptdemo · JW Creative'
		},
		demo: {
			title: 'Dit is een conceptdemo.',
			book: 'Op de echte site boek je hier je proefles. Deze demo neemt geen boekingen aan.',
			link: 'Op de echte site gaat deze link verder. Deze demo blijft hier.',
			toForm: 'Naar het aanmeldformulier',
			follow: 'Toch naar de link',
			portfolioBook: 'Op de echte site boek je hier je proefles. Dit is een portfolio-demo van JW Creative: boeken kan alleen via de echte site van MOOON.',
			portfolioLink: 'Op de echte site gaat deze link verder. Dit is een portfolio-demo van JW Creative, dus hier stopt hij.',
			close: 'Sluiten'
		}
	}
};
