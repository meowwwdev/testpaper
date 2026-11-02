<script setup lang="ts">
// Footer (§6.10). Jahr wird beim Generieren gesetzt und im Browser aktualisiert.
const year = ref(2026)
onMounted(() => { year.value = new Date().getFullYear() })
</script>

<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer__grid">
        <div>
          <SiteLogo light />
          <p>Ihr Malerbetrieb in <span class="ph">[ORT]</span>. Persönlich. Sauber. Pünktlich.</p>
        </div>
        <div>
          <p class="footer__title">Kontakt</p>
          <!-- NAP muss zeichengenau mit dem Google-Unternehmensprofil übereinstimmen -->
          <address>
            <span class="ph">[FIRMENNAME, RECHTSFORM]</span><br>
            <span class="ph">[STRASSE HAUSNR.]</span><br>
            <span class="ph">[PLZ]</span> <span class="ph">[ORT]</span><br>
            Tel. <a :href="links.tel"><span class="ph">[TELEFON]</span></a><br>
            <a :href="links.mail"><span class="ph">[E-MAIL]</span></a>
          </address>
        </div>
        <nav class="footer__nav" aria-label="Footer-Navigation">
          <p class="footer__title">Navigation</p>
          <ul>
            <li v-for="item in footerNav" :key="item.id">
              <SectionLink :id="item.id">{{ item.label }}</SectionLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="footer__bottom">
        <p>© <span>{{ year }}</span> <span class="ph">[FIRMENNAME]</span></p>
        <p class="footer__legal">
          <NuxtLink to="/impressum">Impressum</NuxtLink><NuxtLink to="/datenschutz">Datenschutz</NuxtLink>
        </p>
      </div>
    </div>
  </footer>
</template>
