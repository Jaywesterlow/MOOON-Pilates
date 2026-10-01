# Landingspagina-structuur — MOOON Pilates demo

Keuzes van Jaymar (1 okt 2026):
- **Talen:** NL op `/`, EN op `/en`.
- **Hoofddoel:** proefles boeken ("Meet the reformer", €25).
- **Inhoud:** wat MOOON nu op de site heeft, plus wat een complete landingspagina nodig heeft. Alle feiten komen van hun eigen site; niets wordt verzonnen.

| # | Sectie | Inhoud | Bron | Waarom |
|---|---|---|---|---|
| 1 | **Hero** | Tagline "Move slowly, feel deeply", één regel uitleg, CTA "Boek een proefles", adres en "vandaag open tot …" | home | Wie, wat, waar en de actie, binnen één scherm |
| 2 | **Vertrouwensregel** | Gecertificeerde studio en instructeurs, Classical + Contemporary, voor beginners en gevorderden | home, about | Twijfel weghalen vóór het aanbod |
| 3 | **Wat is reformer pilates** | Kort: kracht, houding, flow, zonder dat het zwaar voelt | reformer-pilates | Veel bezoekers kennen de reformer niet |
| 4 | **Aanbod** | Reformer, E-Reformer, Bodyroll, ĀYU HOUSE (matcha), Academy | nav, home | Diensten |
| 5 | **Je eerste les** | Stap voor stap: aanmelden → Meet the reformer → begeleiding | home ("Tijdens je eerste reformer les …") | Neemt de drempel weg naar het hoofddoel |
| 6 | **Prijzen** | Proefles €25, Try-out 3× €55, 10× €185, 20× €345, unlimited €195 | reformer-pilates (detoxandrollstudio.nl) | Prijzen; vóór het boeken nog een keer laten checken |
| 7 | **Oprichtersverhaal** | Anjali, Nasrien en Monica, "What started as a personal need …" | home | Wie we zijn |
| 8 | **De studio** | Foto's van de shoot (DASHENKO), warm licht en rust | about, fotocheck.md | Sfeer en bewijs |
| 9 | **Meer dan een studio** | Privélessen, verjaardagen, bedrijfsuitjes, workshops, events | about | Tweede doelgroep |
| 10 | **FAQ** | Vragen en antwoorden van hun "Prijzen en FAQs"-pagina, met FAQPage JSON-LD | prijzen-en-faqs | AEO en bezwaren wegnemen |
| 11 | **Bezoek en contact** | Zuidpassage 24, ma–zo 07:00–23:00, WhatsApp, e-mail, kaartlink, CTA | footer, reformer-pilates | Afsluitende actie |
| — | **Footer** | Logo, socials, voorwaarden | home | — |

## Niet erin
- **Reviews:** er staan er geen op hun site. Alleen echte reviews met een bron (bijvoorbeeld Google), anders niets.
- **Getallen en resultaten:** niet verzinnen.

## Structuur voor zoekmachines
- **JSON-LD:** `ExerciseGym` (adres, openingstijden, prijzen als `Offer`) en `FAQPage`.
- **Koppen:** één H1, en een H2 per sectie.

## Nog na te lopen
- De pagina "Prijzen en FAQs" moet nog gescrapet worden voor de exacte vragen.
- De prijzen staan op het oude domein (detoxandrollstudio.nl): checken of ze nog gelden.
