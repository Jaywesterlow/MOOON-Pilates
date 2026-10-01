import type { Hours, OpeningWords } from './studio';

function toMinutes(time: string): number {
	const [hours, minutes] = time.split(':').map(Number);
	return hours * 60 + minutes;
}

function blockFor(day: number, hours: Hours[]): Hours | undefined {
	return hours.find((block) => block.days.includes(day));
}

/** The one line for the hero: open today until when, or when the doors open next. */
export function openingHeadline(now: Date, hours: Hours[], words: OpeningWords): string {
	const day = now.getDay();
	const minutes = now.getHours() * 60 + now.getMinutes();
	const today = blockFor(day, hours);

	if (today && minutes < toMinutes(today.opens)) return `${words.opensToday} ${today.opens}`;
	if (today && minutes < toMinutes(today.closes)) return `${words.openUntil} ${today.closes}`;

	const tomorrow = blockFor((day + 1) % 7, hours);
	return tomorrow ? `${words.opensTomorrow} ${tomorrow.opens}` : words.fallback;
}
