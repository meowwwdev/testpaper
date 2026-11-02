<script setup lang="ts">
// Karte mit 2-Klick-Lösung (§6.9c): Google wird erst nach Einwilligung geladen, Einwilligung gilt nur für die Session
const mapSrc = 'https://www.google.com/maps?q=Maler%20Vogel%20%5BSTRASSE%20HAUSNR.%5D%20%5BPLZ%5D%20%5BORT%5D&output=embed'
const consentKey = 'mv-map-consent'
const loaded = ref(false)

onMounted(() => {
  try { if (sessionStorage.getItem(consentKey) === '1') loaded.value = true } catch { /* Storage gesperrt */ }
})

function load() {
  try { sessionStorage.setItem(consentKey, '1') } catch { /* ignorieren */ }
  loaded.value = true
}
</script>

<template>
  <div id="map" class="map">
    <iframe
      v-if="loaded"
      :src="mapSrc"
      title="Standort Maler Vogel auf Google Maps"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
    <div v-else class="map__consent">
      <AppIcon name="map-pin" size="xl" />
      <p>Neugierig, wo wir zu Hause sind? Beim Laden der Karte werden Daten an Google übertragen. Mehr in unserer <NuxtLink class="link text-inherit" to="/datenschutz">Datenschutzerklärung</NuxtLink>.</p>
      <div class="map__actions">
        <UiButton variant="on-dark" @click="load">Karte laden</UiButton>
        <a class="btn-ghost" href="https://www.google.com/maps/search/?api=1&query=Maler%20Vogel%20%5BORT%5D" target="_blank" rel="noopener">In Google Maps öffnen <AppIcon name="external" size="sm" /></a>
      </div>
    </div>
  </div>
</template>
