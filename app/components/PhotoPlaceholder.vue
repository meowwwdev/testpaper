<script setup lang="ts">
// Foto-Platzhalter (§5: „Foto folgt“), bis echte Fotos vom Kunden vorliegen
withDefaults(defineProps<{
  as?: 'div' | 'span'
  label?: string
  hint?: string
  iconSize?: 'lg' | 'xl'
}>(), {
  as: 'div',
  iconSize: 'xl',
})
</script>

<template>
  <component :is="as" class="photo-ph" :role="label ? 'img' : undefined" :aria-label="label">
    <AppIcon name="image" :size="iconSize" />
    <slot>Foto folgt</slot>
    <span v-if="hint" class="photo-ph__hint">{{ hint }}</span>
  </component>
</template>
