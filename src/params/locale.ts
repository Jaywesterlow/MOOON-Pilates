import type { ParamMatcher } from '@sveltejs/kit';

/** Only `/en` is a language segment; Dutch lives at `/` and has none. */
export const match = ((param: string): param is 'en' => param === 'en') satisfies ParamMatcher;
