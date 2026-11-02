<script setup lang="ts">
// Signet inline (Vorlage: public/assets/logo-signet.svg), damit es die Theme-Farben übernimmt
defineProps<{ light?: boolean }>()
</script>

<template>
  <SectionLink id="start" class="logo" :class="{ 'logo--light': light }">
    <svg class="logo__signet" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
      <path d="M5 21c0-7.2 5.6-13 12.6-13 4.3 0 7.6 2.1 9.4 5.2l3 .6-2.6 1.6c.2 6.4-5.4 11.6-12.4 11.6C9.2 27 5 24.6 5 21z" fill="currentColor" />
      <path class="logo__breast" d="M8.2 21.4c.4-4.6 3.8-7.8 8.3-7.8 3.2 0 5.5 1.7 6.4 4.4-.6 3.9-4.2 6.8-8.7 6.8-2.8 0-5-1.3-6-3.4z" />
      <circle class="logo__eye" cx="22.6" cy="12.4" r="1.3" />
      <path class="logo__stroke" d="M3 26.5c3.5-.6 6.6-.6 10 .2" stroke-width="1.6" stroke-linecap="round" fill="none" />
    </svg>
    <span>Maler <span class="logo__accent">Vogel</span></span>
  </SectionLink>
</template>
