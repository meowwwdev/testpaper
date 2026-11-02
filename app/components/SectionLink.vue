<script setup lang="ts">
// Sprungmarke auf eine Sektion der Startseite.
// Auf der Startseite ein normaler Anker (scrollt auch bei wiederholtem Klick),
// auf Unterseiten ein Router-Link zur Startseite inkl. Hash.
const props = defineProps<{ id: string }>()

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <a v-if="isHome" :href="`#${props.id}`"><slot /></a>
  <NuxtLink v-else :to="{ path: '/', hash: `#${props.id}` }"><slot /></NuxtLink>
</template>
