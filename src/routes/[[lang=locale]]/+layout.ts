import { content, localeFrom } from '$lib/data/studio';
import type { LayoutLoad } from './$types';

// Two pages of fixed content, `/` and `/en`: render both at build time.
export const prerender = true;

export const load: LayoutLoad = ({ params }) => content[localeFrom(params.lang)];
