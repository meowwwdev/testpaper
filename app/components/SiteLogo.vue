<script setup lang="ts">
import { joinURL } from 'ufo'

defineProps<{ light?: boolean }>()

const signet = joinURL(useRuntimeConfig().app.baseURL, 'assets/logo-signet.svg')
</script>

<template>
  <SectionLink id="start" class="logo" :class="{ 'logo--light': light }">
    <img :src="signet" alt="" width="32" height="32">
    <span>Maler <span class="logo__accent">Vogel</span></span>
  </SectionLink>
</template>
