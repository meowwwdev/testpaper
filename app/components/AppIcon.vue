<script setup lang="ts">
// Lucide-Icon aus dem lokal eingebetteten Sprite (siehe IconSprite.vue)
const props = defineProps<{
  name: string
  size?: 'sm' | 'lg' | 'xl'
}>()

const classes = computed(() => ['icon', props.size && `icon--${props.size}`])
</script>

<template>
  <svg :class="classes" aria-hidden="true"><use :href="`#i-${name}`" /></svg>
</template>
