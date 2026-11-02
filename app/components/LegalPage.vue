<script setup lang="ts">
// Rahmen für Rechtsseiten (§6.11)
defineProps<{
  title: string
  note: string
}>()
</script>

<template>
  <main id="inhalt" class="legal">
    <div class="container">
      <div class="prose">
        <NuxtLink class="btn-ghost" to="/"><span aria-hidden="true">←</span> Zurück zur Startseite</NuxtLink>
        <h1 class="t-h2">{{ title }}</h1>
        <p class="ph-note">{{ note }}</p>
        <slot />
      </div>
    </div>
  </main>
</template>
