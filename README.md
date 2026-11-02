# Maler Vogel – Website

One-Page-Website für den Malerbetrieb „Maler Vogel“, gebaut mit **Nuxt 4 + Tailwind CSS 4** und als
statische Seite (SSG) auf **GitHub Pages** ausgeliefert.
Grundlage: Design-Spezifikation (MEOA-5, Dokument `design`) und Konkurrenz-Recherche (MEOA-4).
Inhaltlich 1:1 aus der statischen v1 (MEOA-6) übernommen.

Live: <https://meowwwdev.github.io/testpaper/>

## Entwicklung

Node.js 22.22+ oder 24.15+.

```bash
npm install
npm run dev        # http://localhost:3000/testpaper/
npm run generate   # statischer Build nach .output/public
```

Der Base-Pfad ist `/testpaper/` (GitHub Project Page). Für einen Build ohne Präfix:
`NUXT_APP_BASE_URL=/ npm run generate`.

## Deploy

`.github/workflows/deploy.yml` baut bei jedem Push auf `main` mit `nuxt generate` und veröffentlicht
`.output/public` über `actions/deploy-pages`. Voraussetzung im Repo: Settings → Pages → Source: **GitHub Actions**.

## Struktur

```
nuxt.config.ts              SSG, Base-URL, globale Head-Tags, Tailwind-Vite-Plugin
app/assets/css/main.css     Tailwind-Theme (@theme: Farben, Schriften, Radien, Schatten),
                            responsive Rollen-Tokens, Komponenten-Klassen (§6)
app/layouts/default.vue     Icon-Sprite, Skip-Link, Header, Footer, mobile Aktionsleiste
app/pages/                  index (One-Pager), impressum, datenschutz
app/components/             SiteHeader (Menü, Scroll-Spy), SiteFooter, UiButton, AppIcon/IconSprite,
                            BeforeAfter (Slider), ProjectGallery (Lightbox), ContactForm, MapConsent
                            (2-Klick-Karte), ActionBar, LegalPage, PhotoPlaceholder, SectionLink, SiteLogo
app/utils/site.ts           Navigation und Kontakt-Links (tel/mailto/WhatsApp)
public/assets/              Logo-Signet (Platzhalter), Pinselstrich, Farbfleck (alle selbst erstellt, SVG)
```

Gestaltungswerte stehen ausschließlich als Tokens in `main.css` (`@theme`) und sind damit auch als
Tailwind-Utilities verfügbar (`bg-robin`, `text-ink-soft`, `rounded-card`, `shadow-card`, `font-display` …).
Die Seite ist ohne JavaScript lesbar und bedienbar; die Klasse `.js` auf `<html>` schaltet die
interaktiven Varianten frei.

## Platzhalter

- Kundendaten stehen überall als `[ECKIGE KLAMMERN, VERSALIEN]` und sind im Browser **orange gestreift
  und gestrichelt umrandet** (`.ph`), damit nichts davon versehentlich live geht.
- Prüfen vor dem Livegang: `grep -rn '\[' app/` darf keine Kundendaten-Platzhalter mehr finden.
- Fotos: graue Kacheln „Foto folgt“. Kunde braucht einen Foto-Termin (Team + 5–10 Projekte, je 1 Vorher/Nachher-Paar).
- Kundenstimmen sind **Beispieltexte**. Live gehen nur echte Zitate mit Einwilligung, sonst Sektion entfernen.

## Offene Punkte

- **Schriften:** Bricolage Grotesque + Inter (SIL OFL) als WOFF2 in `public/fonts` ablegen und die
  `@font-face`-Blöcke oben in `app/assets/css/main.css` einkommentieren. Bis dahin werden System-Schriften
  genutzt. Keine Google-Fonts-Requests.
- **Formular:** sendet per `POST /api/contact`. GitHub Pages hat kein Backend, deshalb zeigt das Formular
  den Fehlerzustand („Das hat leider nicht geklappt …“). Validierung und alle Zustände funktionieren clientseitig.
- **Icons:** Lucide (ISC-Lizenz), als Inline-SVG-Sprite eingebettet (`IconSprite.vue`).
