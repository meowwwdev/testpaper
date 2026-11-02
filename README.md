# Maler Vogel – Website v1

Statische One-Page-Website (HTML + CSS + wenig JS, kein Build) für den Malerbetrieb „Maler Vogel“.
Grundlage: Design-Spezifikation (MEOA-5, Dokument `design`) und Konkurrenz-Recherche (MEOA-4).

## Lokal ansehen

- Einfach `index.html` im Browser öffnen, **oder**
- mit lokalem Server (empfohlen, verhält sich wie live): `python3 -m http.server 8000` → <http://localhost:8000>

## Struktur

```
index.html        One-Pager: Header, Hero, Vertrauensleiste, Leistungen, Vorher/Nachher + Galerie,
                  Über uns, Ablauf, Kundenstimmen, Kontakt (Formular + 2-Klick-Karte), Footer,
                  mobile Sticky-Aktionsleiste
impressum.html    Impressum-Gerüst (Platzhalter)
datenschutz.html  Datenschutz-Gerüst (Platzhalter, finale Fassung per Generator)
css/styles.css    Design-Tokens (CSS Custom Properties, §2–§4 der Spezifikation) + Komponenten
js/main.js        Menü, Scroll-Spy, Vorher/Nachher-Slider, Lightbox, Sticky-Bar, Karte, Formular
assets/           Logo-Signet (Platzhalter), Pinselstrich, Farbfleck (alle selbst erstellt, SVG)
```

## Platzhalter

- Kundendaten stehen überall als `[ECKIGE KLAMMERN, VERSALIEN]` und sind im Browser **orange gestreift
  und gestrichelt umrandet** (`.ph`), damit nichts davon versehentlich live geht.
- Prüfen vor dem Livegang: `grep -rn '\[' --include=*.html .` darf keine Kundendaten-Platzhalter mehr finden.
- Fotos: graue Kacheln „Foto folgt“. Kunde braucht einen Foto-Termin (Team + 5–10 Projekte, je 1 Vorher/Nachher-Paar).
- Kundenstimmen sind **Beispieltexte**. Live gehen nur echte Zitate mit Einwilligung, sonst Sektion entfernen.

## Offene Punkte

- **Schriften:** Bricolage Grotesque + Inter (SIL OFL) als WOFF2 in `/fonts` ablegen und die `@font-face`-Blöcke
  oben in `css/styles.css` einkommentieren. Bis dahin werden System-Schriften genutzt. Keine Google-Fonts-Requests.
- **Formular:** sendet per `POST /api/contact`. Ohne Backend zeigt es den Fehlerzustand
  („Das hat leider nicht geklappt …“), Validierung und alle Zustände funktionieren clientseitig.
- **Icons:** Lucide (ISC-Lizenz), als Inline-SVG-Sprite eingebettet.
