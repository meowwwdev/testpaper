<script setup lang="ts">
useHead({ title: 'Impressum – Maler Vogel' })
</script>

<template>
  <LegalPage title="Impressum" note="Platzhalter: Inhalte vom Kunden bzw. per Impressum-Generator liefern und prüfen lassen">
    <h2>Angaben gemäß § 5 DDG</h2>
    <p><span class="ph">[FIRMENNAME, RECHTSFORM]</span><br><span class="ph">[STRASSE HAUSNR.]</span><br><span class="ph">[PLZ]</span> <span class="ph">[ORT]</span></p>

    <h2>Vertreten durch</h2>
    <p><span class="ph">[INHABER / GESCHÄFTSFÜHRER]</span></p>

    <h2>Kontakt</h2>
    <p>Telefon: <a class="link" :href="links.tel"><span class="ph">[TELEFON]</span></a><br>E-Mail: <a class="link" :href="links.mail"><span class="ph">[E-MAIL]</span></a></p>

    <h2>Registereintrag</h2>
    <p><span class="ph">[REGISTERGERICHT, HRB/HRA-NR.]</span> (nur falls eingetragen)</p>

    <h2>Umsatzsteuer-ID</h2>
    <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: <span class="ph">[USt-IdNr.]</span> (falls vorhanden)</p>

    <h2>Berufsrechtliche Angaben</h2>
    <p>
      Berufsbezeichnung: Maler- und Lackierermeister (verliehen in Deutschland)<br>
      Zuständige Kammer: <span class="ph">[HANDWERKSKAMMER …]</span><br>
      Berufsrechtliche Regelung: Handwerksordnung (HwO), einsehbar unter <a class="link" href="https://www.gesetze-im-internet.de/hwo/" target="_blank" rel="noopener">www.gesetze-im-internet.de</a>
    </p>

    <h2>Verbraucherstreitbeilegung</h2>
    <p><span class="ph">[TEILNAHMEBEREITSCHAFT JA/NEIN, Text laut Generator]</span></p>
  </LegalPage>
</template>
