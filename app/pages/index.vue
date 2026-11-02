<script setup lang="ts">
import type { GalleryItem } from '~/components/ProjectGallery.vue'

definePageMeta({ actionBar: true })

useHead({
  title: 'Maler Vogel – Malerbetrieb in [ORT] | Innenanstrich, Fassade, Tapezieren',
  meta: [
    { name: 'description', content: 'Ihr Malerbetrieb in [ORT] und Umgebung: Innenanstrich, Fassade, Tapezieren und Lackierarbeiten. Persönlich, sauber, pünktlich. Jetzt anrufen: [TELEFON].' },
  ],
  // Strukturierte Daten: Platzhalter vor Livegang mit echten NAP-Daten ersetzen (identisch zum Footer)
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HousePainter',
      'name': 'Maler Vogel',
      'legalName': '[FIRMENNAME, RECHTSFORM]',
      'telephone': '[TELEFON_E164]',
      'email': '[E-MAIL]',
      'url': '[WEBSITE-URL]',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '[STRASSE HAUSNR.]',
        'postalCode': '[PLZ]',
        'addressLocality': '[ORT]',
        'addressCountry': 'DE',
      },
      'areaServed': ['[ORT]', '[NACHBARORT 1]', '[NACHBARORT 2]', '[NACHBARORT 3]'],
      'openingHours': 'Mo-Fr [07:00-17:00]',
    }),
  }],
})

const services = [
  { icon: 'paint-roller', title: 'Innenanstrich', text: 'Wände und Decken in Wunschfarbe, mit sorgfältigem Abkleben und Möbelschutz. Auch kurzfristig und bewohnt.' },
  { icon: 'house', title: 'Fassadenanstrich', text: 'Schutz und neuer Glanz für Ihr Haus: Reinigung, Ausbesserung und langlebige Fassadenfarben.' },
  { icon: 'layers', title: 'Tapezieren', text: 'Von Raufaser bis Designtapete: glatt verklebt, Stoß auf Stoß, ohne Blasen.' },
  { icon: 'brush', title: 'Lackierarbeiten', text: 'Türen, Fenster, Heizkörper und Geländer: frisch lackiert und wieder wie neu.' },
  { icon: 'sparkles', title: 'Kreative Techniken', text: 'Lasuren, Kalk- und Spachteltechniken für Räume mit Charakter.' },
  { icon: 'shield-check', title: 'Schimmel­sanierung', text: 'Ursache finden, fachgerecht entfernen, dauerhaft vorbeugen.' },
]

const projects: GalleryItem[] = [
  { title: 'Fassadenanstrich · Einfamilienhaus', place: '[ORT]', motif: 'facade' },
  { title: 'Innenanstrich · Kinderzimmer', place: '[ORT]', motif: 'room' },
  { title: 'Tapezieren · Schlafzimmer', place: '[ORT]', motif: 'wallpaper' },
  { title: 'Lackierarbeiten · Holztreppe', place: '[ORT]', motif: 'stairs' },
  { title: 'Kalkputz-Technik · Wohnküche', place: '[ORT]', motif: 'texture' },
  { title: 'Treppenhaus · Mehrfamilienhaus', place: '[ORT]', motif: 'apartment' },
]

const values = [
  { icon: 'clock', title: 'Pünktlich', text: 'Termine, auf die Sie sich verlassen können.' },
  { icon: 'sparkles', title: 'Sauber', text: 'Abdecken, Abkleben, Aufräumen inklusive.' },
  { icon: 'handshake', title: 'Persönlich', text: 'Ein fester Ansprechpartner, vom Angebot bis zur Abnahme.' },
]

// Beispieltexte! Live nur echte Zitate mit Einwilligung, sonst Sektion entfernen (§6.8)
const testimonials = [
  { quote: 'Die Wohnung war nach zwei Tagen fertig, und es sah aus, als wäre nie jemand da gewesen. Nur die Wände waren neu. Absolut empfehlenswert!', name: '[KUNDE 1]', service: 'Innenanstrich' },
  { quote: 'Super Beratung bei der Farbwahl für unsere Fassade. Pünktlich, freundlich und das Ergebnis begeistert uns jeden Tag.', name: '[KUNDE 2]', service: 'Fassade' },
  { quote: 'Herr Vogel hat sich Zeit genommen und ehrlich gesagt, was nötig ist und was nicht. So stellt man sich Handwerk vor.', name: '[KUNDE 3]', service: 'Tapezieren' },
]

// „Angebot anfragen“: nach dem Scrollen erstes Formularfeld fokussieren
function focusForm() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  setTimeout(() => document.getElementById('f-name')?.focus({ preventScroll: true }), reduceMotion ? 0 : 600)
}
</script>

<template>
  <main id="inhalt">
    <!-- ================= Hero ================= -->
    <section id="start" class="hero" aria-labelledby="hero-title">
      <div class="container hero__grid">
        <div class="hero__text">
          <span class="badge">
            <AppIcon name="award" size="sm" />
            Meisterbetrieb seit <span class="ph">[GRÜNDUNGSJAHR]</span>
          </span>
          <h1 id="hero-title" class="t-display">Farbe mit <span class="brush">Liebe</span> zum Detail.</h1>
          <p class="t-lead">Malerarbeiten, Fassaden und Tapezieren in <span class="ph">[ORT]</span> und Umgebung. Persönlich, sauber und pünktlich, vom Meister selbst.</p>
          <div id="hero-ctas" class="hero__ctas">
            <UiButton :href="links.tel" size="lg" icon="phone">Jetzt anrufen</UiButton>
            <UiButton href="#kontakt" variant="secondary" size="lg" @click="focusForm">Angebot anfragen</UiButton>
          </div>
          <!-- [MIT KUNDE BESTÄTIGEN]: nur live, wenn der Kunde beides zusagt (§8) -->
          <p class="t-small t-muted hero__micro">Kostenlose Besichtigung vor Ort · Antwort innerhalb von 24 Stunden <span class="ph">[MIT KUNDE BESTÄTIGEN]</span></p>
        </div>
        <div class="hero__media">
          <svg class="hero__blob" viewBox="0 0 200 200" aria-hidden="true"><path fill="currentColor" d="M41 36c24-22 70-30 104-14 30 14 50 44 46 78-3 30-26 46-30 72-4 22-36 28-62 22-30-7-42-30-66-44C10 136 2 108 8 82c4-18 18-31 33-46z" /></svg>
          <div class="hero__img">
            <PhotoPlaceholder
              motif="facade"
              label="Platzhalter für das Hero-Foto: Team vor frisch gestrichener Fassade"
              hint="Hero-Foto: Team vor frisch gestrichener Fassade, Motiv rechts"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Vertrauensleiste ================= -->
    <!-- Regel §6.3: Items ohne Kundendaten entfernen, keine erfundenen Werte live schalten -->
    <div class="trustbar">
      <div class="container">
        <ul>
          <li><span class="t-stat"><span class="ph">[XX]</span>+</span><span class="t-small t-muted">Jahre Erfahrung</span></li>
          <li><span class="t-stat">Meister</span><span class="t-small t-muted">geprüfter Meisterbetrieb</span></li>
          <li><span class="t-stat"><span class="ph">[ORT]</span></span><span class="t-small t-muted">&amp; <span class="ph">[XX]</span> km Umkreis</span></li>
          <li><span class="t-stat" aria-label="[X,X] von 5 Sternen"><span class="ph">[X,X]</span> ★</span><span class="t-small t-muted">bei Google (<span class="ph">[ANZAHL]</span> Bewertungen)</span></li>
        </ul>
      </div>
    </div>

    <!-- ================= Leistungen ================= -->
    <section id="leistungen" class="section section--sand" aria-labelledby="leistungen-title">
      <div class="container">
        <div class="section-head">
          <p class="t-overline">Leistungen</p>
          <h2 id="leistungen-title" class="t-h2">Was wir für Sie <span class="brush">streichen</span>, tapezieren und gestalten.</h2>
          <p class="t-lead">Ob ein Zimmer oder das ganze Haus: Wir beraten Sie ehrlich, arbeiten sauber und hinterlassen alles so, wie wir es vorgefunden haben, nur schöner.</p>
          <p class="mt-4"><span class="ph-note">[LEISTUNGEN BESTÄTIGEN]: Liste vom Kunden freigeben lassen</span></p>
        </div>

        <ul class="grid-services section-body">
          <li v-for="service in services" :key="service.icon" class="card service-card">
            <span class="icon-circle"><AppIcon :name="service.icon" size="lg" /></span>
            <h3 class="t-h3">{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </li>
        </ul>

        <p class="services-more">
          <span>Ihre Leistung ist nicht dabei? <strong>Fragen Sie uns einfach.</strong></span>
          <a class="btn-ghost" href="#kontakt">Zum Kontakt <AppIcon name="arrow-right" size="sm" /></a>
        </p>
      </div>
    </section>

    <!-- ================= Referenzen ================= -->
    <section id="referenzen" class="section" aria-labelledby="referenzen-title">
      <div class="container">
        <div class="section-head">
          <p class="t-overline">Referenzen</p>
          <h2 id="referenzen-title" class="t-h2">Vorher. <span class="brush">Nachher.</span> Überzeugen Sie sich selbst.</h2>
          <p class="t-lead">Ein paar unserer Projekte aus <span class="ph">[ORT]</span> und Umgebung.</p>
        </div>

        <figure class="ba-wrap section-body">
          <BeforeAfter />
          <figcaption class="t-small t-muted ba-caption">Wohnzimmer · Altbauwohnung · <span class="ph">[ORT]</span>: Wände gespachtelt und in Kalkweiß gestrichen.</figcaption>
        </figure>

        <ProjectGallery :items="projects" />
      </div>
    </section>

    <!-- ================= Über uns ================= -->
    <section id="ueber-uns" class="section section--line" aria-labelledby="ueber-title">
      <div class="container about__grid">
        <div class="about__media">
          <div class="about__img">
            <PhotoPlaceholder motif="portrait" label="Platzhalter für das Porträt des Inhabers" hint="Porträt Inhaber/Team im Arbeitsoutfit, 4:5" />
          </div>
          <p class="about__badge">Meister&shy;betrieb seit <span class="ph">[GRÜNDUNGSJAHR]</span></p>
        </div>
        <div class="about__text">
          <p class="t-overline">Über uns</p>
          <h2 id="ueber-title" class="t-h2">Ein Familienbetrieb aus <span class="brush"><span class="ph">[ORT]</span></span>.</h2>
          <p>Hinter Maler Vogel stehen <span class="ph">[VORNAME NACHNAME]</span> und ein kleines, eingespieltes Team. Seit <span class="ph">[GRÜNDUNGSJAHR]</span> verschönern wir Wohnungen, Häuser und Geschäftsräume in <span class="ph">[ORT]</span> und Umgebung, <span class="ph">[GENERATION, z. B. „in zweiter Generation“]</span>.</p>
          <p>Uns ist wichtig, dass Sie sich keine Sorgen machen müssen: Wir kommen pünktlich, schützen Ihre Möbel und Böden und räumen jeden Abend auf. Und wenn wir gehen, bleibt nur die neue Farbe zurück.</p>
          <ul class="values">
            <li v-for="value in values" :key="value.title">
              <AppIcon :name="value.icon" /><strong>{{ value.title }}</strong><span>{{ value.text }}</span>
            </li>
          </ul>
          <div class="signature">
            <p class="t-h3"><span class="ph">[VORNAME NACHNAME]</span></p>
            <p class="t-small t-muted">Malermeister &amp; Inhaber</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ================= Ablauf ================= -->
    <section id="ablauf" class="section section--sand" aria-labelledby="ablauf-title">
      <div class="container">
        <div class="section-head">
          <p class="t-overline">So arbeiten wir</p>
          <h2 id="ablauf-title" class="t-h2">In vier Schritten zur <span class="brush">frischen</span> Wand.</h2>
        </div>
        <ol class="steps section-body">
          <li class="step"><span class="step__num" aria-hidden="true">1</span><div><h3 class="t-h3">Anfrage</h3><p>Rufen Sie an, schreiben Sie uns per WhatsApp oder nutzen Sie das Formular.</p></div></li>
          <li class="step"><span class="step__num" aria-hidden="true">2</span><div><h3 class="t-h3">Besichtigung</h3><p>Wir kommen kostenlos vorbei, schauen uns alles an und beraten Sie zu Farben und Materialien. <span class="ph">[MIT KUNDE BESTÄTIGEN]</span></p></div></li>
          <li class="step"><span class="step__num" aria-hidden="true">3</span><div><h3 class="t-h3">Festpreis-Angebot</h3><p>Sie erhalten ein klares, schriftliches Angebot ohne versteckte Kosten. <span class="ph">[MIT KUNDE BESTÄTIGEN]</span></p></div></li>
          <li class="step"><span class="step__num" aria-hidden="true">4</span><div><h3 class="t-h3">Ausführung &amp; Abnahme</h3><p>Wir arbeiten sauber und termingerecht und übergeben alles gemeinsam mit Ihnen.</p></div></li>
        </ol>
        <div class="steps-cta">
          <UiButton href="#kontakt" size="lg" @click="focusForm">Jetzt Besichtigung vereinbaren</UiButton>
        </div>
      </div>
    </section>

    <!-- ================= Kundenstimmen ================= -->
    <!-- ⚠ Beispieltexte! Live nur echte Zitate mit Einwilligung, sonst Sektion entfernen (§6.8) -->
    <section id="stimmen" class="section" aria-labelledby="stimmen-title">
      <div class="container">
        <div class="section-head section-head--center">
          <p class="t-overline">Kundenstimmen</p>
          <h2 id="stimmen-title" class="t-h2">Das sagen unsere <span class="brush">Kunden</span>.</h2>
          <p class="rating">
            <span class="stars" role="img" aria-label="[X,X] von 5 Sternen">
              <AppIcon v-for="n in 5" :key="n" name="star" />
            </span>
            <span><span class="ph">[X,X]</span> von 5 · <span class="ph">[ANZAHL]</span> Google-Bewertungen</span>
          </p>
        </div>
        <div class="testimonials section-body">
          <figure v-for="t in testimonials" :key="t.name" class="card testimonial">
            <span class="testimonial__mark" aria-hidden="true">„</span>
            <blockquote>{{ t.quote }}</blockquote>
            <figcaption><strong class="ph">{{ t.name }}</strong>, <span class="ph">[ORT]</span> · {{ t.service }}</figcaption>
          </figure>
        </div>
        <p class="testimonials-note"><span class="ph-note">Beispieltexte: nur echte Zitate mit Einwilligung veröffentlichen</span></p>
      </div>
    </section>

    <!-- ================= Kontakt ================= -->
    <section id="kontakt" class="section contact on-dark" aria-labelledby="kontakt-title">
      <div class="container">
        <div class="contact__grid">
          <div class="contact__info">
            <p class="t-overline">Kontakt</p>
            <h2 id="kontakt-title" class="t-h2">Was haben Sie <span class="brush">vor</span>?</h2>
            <p class="t-lead">Erzählen Sie uns kurz von Ihrem Projekt. Wir melden uns schnell zurück und vereinbaren gern einen Termin vor Ort.</p>

            <dl class="contact-list">
              <div>
                <dt><AppIcon name="phone" /><span class="sr-only">Telefon</span></dt>
                <dd><a class="contact-list__phone" :href="links.tel"><span class="ph">[TELEFON]</span></a></dd>
              </div>
              <div>
                <dt><AppIcon name="message" /><span class="sr-only">WhatsApp</span></dt>
                <dd><a :href="links.whatsapp" target="_blank" rel="noopener">WhatsApp schreiben</a> <span class="ph">[NUR WENN KUNDE WHATSAPP NUTZT]</span></dd>
              </div>
              <div>
                <dt><AppIcon name="mail" /><span class="sr-only">E-Mail</span></dt>
                <dd><a :href="links.mail"><span class="ph">[E-MAIL]</span></a></dd>
              </div>
              <div>
                <dt><AppIcon name="map-pin" /><span class="sr-only">Adresse</span></dt>
                <dd><span class="ph">[STRASSE HAUSNR.]</span>, <span class="ph">[PLZ]</span> <span class="ph">[ORT]</span></dd>
              </div>
              <div>
                <dt><AppIcon name="clock" /><span class="sr-only">Öffnungszeiten</span></dt>
                <dd>Mo–Fr <span class="ph">[07:00–17:00 Uhr]</span> · Sa nach Vereinbarung</dd>
              </div>
              <div>
                <dt><AppIcon name="map" /><span class="sr-only">Einsatzgebiet</span></dt>
                <dd>Einsatzgebiet: <span class="ph">[ORT]</span>, <span class="ph">[NACHBARORT 1]</span>, <span class="ph">[NACHBARORT 2]</span>, <span class="ph">[NACHBARORT 3]</span> und Umgebung</dd>
              </div>
            </dl>

            <div class="contact__buttons">
              <UiButton :href="links.tel" variant="on-dark" size="lg" icon="phone">Jetzt anrufen</UiButton>
              <UiButton :href="links.whatsapp" variant="whatsapp" size="lg" icon="message" target="_blank" rel="noopener">WhatsApp</UiButton>
            </div>
          </div>

          <div class="contact__form">
            <ContactForm />
          </div>
        </div>

        <!-- Karte: 2-Klick-Lösung, Google wird erst nach Einwilligung geladen -->
        <MapConsent />
      </div>
    </section>
  </main>
</template>
