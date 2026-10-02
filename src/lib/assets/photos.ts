/**
 * Every photo goes through @sveltejs/enhanced-img: AVIF + WebP, srcset, intrinsic width/height.
 * Static imports (not a glob) so a missing file fails the build instead of the page.
 *
 * All MOOON's own photos from mooonpilates.nl, downloaded 1 October 2026: the DASHENKO shoot
 * (April 2026, Canon EOS R5) first, then their own studio photos. `scripts/photos.txt` is the
 * record of which upload became which file.
 */
// 2026/08/IMG_6578-scaled.jpg (the reformer room; the ground of the hero)
import hero from './photos/hero.jpg?enhanced';
// 2026/08/Mooon-pilates-IMG_6060-2-scaled.jpg
import reformer from './photos/reformer.jpg?enhanced';
// 2026/08/Mooon-pilates-2-scaled.jpg
import offerReformer from './photos/offer-reformer.jpg?enhanced';
// 2026/08/Mooon-pilatesIMG_6078-2-scaled.jpg
import offerEReformer from './photos/offer-e-reformer.jpg?enhanced';
// 2025/05/bamboerollers-scaled.jpg
import offerBodyroll from './photos/offer-bodyroll.jpg?enhanced';
// 2026/04/1Y8A5899-scaled.jpeg (DASHENKO shoot)
import offerAyu from './photos/offer-ayu.jpg?enhanced';
// 2026/08/Mooon-pilatesIMG_6059-scaled.png (as JPG)
import offerAcademy from './photos/offer-academy.jpg?enhanced';
// 2026/04/1Y8A5677-scaled.jpeg (DASHENKO shoot)
import founders from './photos/founders.jpg?enhanced';
// 2026/04/1Y8A5631-scaled.jpeg (DASHENKO shoot)
import studio1 from './photos/studio-1.jpg?enhanced';
// 2026/04/1Y8A5930-scaled.jpeg (DASHENKO shoot)
import studio2 from './photos/studio-2.jpg?enhanced';
// 2026/04/1Y8A6041-scaled.jpeg (DASHENKO shoot)
import studio3 from './photos/studio-3.jpg?enhanced';
// 2026/04/1Y8A5691-scaled.jpeg (DASHENKO shoot)
import more from './photos/more.jpg?enhanced';
// 2026/08/Voorzijde-gevel-Mooon-studios.jpg
import visit from './photos/visit.jpg?enhanced';

export const photos = {
	hero,
	reformer,
	offerReformer,
	offerEReformer,
	offerBodyroll,
	offerAyu,
	offerAcademy,
	founders,
	studio1,
	studio2,
	studio3,
	more,
	visit
};

export type PhotoKey = keyof typeof photos;
