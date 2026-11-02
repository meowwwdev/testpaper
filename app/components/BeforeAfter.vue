<script setup lang="ts">
// Vorher/Nachher-Slider (§6.5a). Ohne JS stehen beide Bilder nebeneinander (CSS-Fallback).
const pos = ref(50)
const dragging = ref(false)

function onKeydown(e: KeyboardEvent) {
  let v = pos.value
  const step = 5
  if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') v -= step
  else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') v += step
  else if (e.key === 'Home') v = 0
  else if (e.key === 'End') v = 100
  else return
  e.preventDefault()
  pos.value = Math.max(0, Math.min(100, v))
}

const stopDragging = () => { dragging.value = false }
onMounted(() => window.addEventListener('pointerup', stopDragging))
onBeforeUnmount(() => window.removeEventListener('pointerup', stopDragging))
</script>

<template>
  <div class="ba" :class="{ 'is-dragging': dragging }" :style="{ '--pos': `${pos}%` }">
    <div class="ba__pane ba__pane--before">
      <span class="ba__label">Vorher</span>
      <PhotoPlaceholder motif="room-before"><slot name="before">Vorher-Foto folgt</slot></PhotoPlaceholder>
    </div>
    <div class="ba__pane ba__pane--after">
      <span class="ba__label">Nachher</span>
      <PhotoPlaceholder motif="room"><slot name="after">Nachher-Foto folgt</slot></PhotoPlaceholder>
    </div>
    <input
      v-model.number="pos"
      class="ba__range"
      type="range"
      min="0"
      max="100"
      step="1"
      aria-label="Vergleich Vorher/Nachher: Regler verschieben"
      :aria-valuetext="`${100 - pos} Prozent Nachher sichtbar`"
      @keydown="onKeydown"
      @pointerdown="dragging = true"
    >
    <div class="ba__handle" aria-hidden="true">
      <span class="ba__knob"><AppIcon name="chevrons-lr" /></span>
    </div>
  </div>
</template>
