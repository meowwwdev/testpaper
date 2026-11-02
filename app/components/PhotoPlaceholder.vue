<script setup lang="ts">
// Foto-Platzhalter (§5: „Foto folgt“), bis echte Fotos vom Kunden vorliegen.
// Motiv aus PlaceholderSprite.vue, Hinweis „Foto folgt“ bleibt immer sichtbar.
export type PlaceholderMotif = 'facade' | 'apartment' | 'room' | 'room-before' | 'wallpaper' | 'stairs' | 'texture' | 'portrait'

withDefaults(defineProps<{
  as?: 'div' | 'span'
  motif?: PlaceholderMotif
  label?: string
  hint?: string
}>(), {
  as: 'div',
  motif: 'room',
})
</script>

<template>
  <component :is="as" class="photo-ph" :role="label ? 'img' : undefined" :aria-label="label">
    <svg class="photo-ph__art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <use :href="`#ph-${motif}`" width="400" height="300" />
    </svg>
    <span class="photo-ph__tag">
      <AppIcon name="image" size="sm" />
      <span><slot>Foto folgt</slot><span v-if="hint" class="photo-ph__hint">{{ hint }}</span></span>
    </span>
  </component>
</template>
