# Merkfeiten: MOOON Pilates (1 oktober 2026)

Alleen feiten van mooonpilates.nl, met Firecrawl opgehaald. Geen voorstellen.

## Kleuren

### Logo: niet gesampled

De logobestanden konden niet worden gedownload, omdat de proxy van deze omgeving mooonpilates.nl weigert (403). Daardoor zijn er **geen pixelkleuren uit het logo gemeten**. Wat wel vaststaat:

- Er zijn een zwarte en een witte versie, volgens de bestandsnamen `…Final-black` en `…Final-white`.
- De footer gebruikt de zwarte versie, de header `IMG_2169.png` op een zwart verloop. Dat het de witte variant is, is afgeleid uit de plek en niet bekeken.
- Meten kan alsnog op een machine met gewone internettoegang: `python3 -c "from PIL import Image; im=Image.open('logo.png').convert('RGBA'); print(im.getcolors(1<<20)[:10])"`.

### Site: Elementor-globale kleuren

Uit `wp-content/uploads/elementor/css/post-10.css`, de kit die voor de hele site geldt:

| Elementor-naam | Hex | Waar gebruikt (in de CSS gezien) |
|---|---|---|
| primary | `#6E7269` | koppen en lijsten, begin van het radiale verloop op de home |
| secondary | `#6B6661` | hoverachtergrond van het dropdownmenu |
| tertiary | `#E2DCD5` | |
| text | `#5C5545` | koppen (h4, sectiekoppen), sectievlak op de home |
| accent | `#C4B39C` | |
| border | `#E5E1DB` | rand van de headerknop |
| lighter | `#989389` | standaard tekstkleur van de body |
| dark | `#000000` | |
| (custom 93832de) | `#F0ECE6` | achtergrond van de paginatransitie |
| (custom 5010363) | `#FFFFFF` | knoptekst, navigatie, achtergrond van de body |

Verder in de pagina-CSS:

- Home: `radial-gradient(at bottom left, #6E7269 0%, #423D31 80%)` als sectieachtergrond.
- Header: `linear-gradient(180deg, #000000 7%, transparent 100%)` over de hero.
- Reformer-pilates: een tekstvlak `#0000008C` (zwart, 55 %) over de slideshow.
- Meta `theme-color`: `#FFFFFF`.

Firecrawl-branding gaf daarnaast `#D9DAD8` en `#2575FC`. Die staan niet in de kit; waar ze vandaan komen is niet nagegaan, waarschijnlijk uit een plugin.

## Logovormen

Pixelmaten uit de WordPress-mediabibliotheek. Er is geen SVG-logo gevonden: het enige SVG-bestand in de bibliotheek is `Instagram_Fill.svg`.

| Vorm | URL | Maat | Waar |
|---|---|---|---|
| Woordmerk zwart | https://mooonpilates.nl/wp-content/uploads/2023/11/Logo-Mooon-Pilates-Final-black.png (ook `.webp`) | 2350×810 | footer |
| Woordmerk wit | https://mooonpilates.nl/wp-content/uploads/2026/05/Logo-Mooon-Pilates-Final-white.png | 2350×810 | niet op de gelezen pagina's |
| Woordmerk wit, bijgesneden | https://mooonpilates.nl/wp-content/uploads/2026/05/cropped-Logo-Mooon-Pilates-Final-white.png | 1214×809 | niet op de gelezen pagina's |
| Headerlogo | https://mooonpilates.nl/wp-content/uploads/2023/11/IMG_2169.png (ook `.webp`) | 2350×810 | header, op een zwart verloop, 62 px hoog (45 px op mobiel) |
| Site-icoon / favicon | https://mooonpilates.nl/wp-content/uploads/2026/07/cropped-IMG_5046.jpg (afgeleid in 32, 180, 192 en 270 px) | 512×512 | favicon, apple-touch-icon |
| Site-icoon, bron | https://mooonpilates.nl/wp-content/uploads/2026/07/IMG_5046.jpg | 170×170 | |
| "MOOON Studios" | https://mooonpilates.nl/wp-content/uploads/2026/05/MOOON-Studios-6-scaled.png | 2560×833 | niet op de gelezen pagina's; inhoud niet bekeken |
| Merkpakket? | https://mooonpilates.nl/wp-content/uploads/2026/05/MOOON-Studios-3.zip | n.v.t. | alleen in de mediabibliotheek; inhoud onbekend |
| ĀYU HOUSE-logo (submerk) | https://mooonpilates.nl/wp-content/uploads/2025/05/AYU-House-logo-scaled.png | 2560×1917 | ayu-house |
| Oud logo, Detox and Roll Studio | `2023/11/Logo-Detox-and-Roll-Studio-DEF-1.png`, `…DEFwit.png` (614×222), `2023/12/Logo-Detox-and-Roll-Studio-small.png` (281×164) | | niet meer op de site |

## Fonts

Uit de Elementor-kit (`post-10.css`), de pagina-CSS en de `<link>`-tags op de home:

| Font | Rol | Bron |
|---|---|---|
| **Aboreto** | globaal primair en secundair: koppen 45 px / 500 (25 px op mobiel), subkoppen 20 px / 400 | Google Font, door Elementor zelf gehost (`uploads/elementor/google-fonts/css/aboreto.css`) |
| **Afacad** | globaal tekst 15 px / 300, regelhoogte 21 px; accent 15 px / 700; navigatie | Google Font, door Elementor zelf gehost (`afacad.css`) |
| **Playfair Display** | standaard `font-family` van de body in de kit (`"Playfair Display", Afaced`), 400, regelhoogte 32 px | Google Font, door Elementor zelf gehost (`playfairdisplay.css`) |
| **Satoshi** | in de home-CSS bij CTA-titels (12 px, uppercase, letterspacing 2 px) en CTA-subtitels | **niet geladen**: er is geen `@font-face` en geen Fontshare-link gevonden, dus de browser valt terug op een systeemfont |
| **Instrument Sans** | door het thema (Winesto) geladen, 400–700 | `fonts.googleapis.com` |

"Afaced" in de fallback-stacks is een typfout in de Elementor-instellingen; het bestaat niet als font.

## Taglines en kernzinnen (letterlijk van de site)

- "Move slowly, feel deeply" (H1 op de home)
- "A soft way to feel strong"
- "Where strength meets softness"
- "Soft where you need it. Strong where it matters."
- "Created with intention. Built with care"
- "What started as a personal need, became a place for others to feel." (Anjali, Nasrien en Monica)
- "Where balance, energy and elegance come together." (boven de H1)

## Techniek

WordPress 7.1.2, Elementor en Elementor Pro 4.2.1, thema Winesto 2.0.7, WooCommerce 10.9.4, Slider Revolution 6.6.19, Swiper 8.4.5, Complianz.
