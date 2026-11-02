<script setup lang="ts">
// Mobile Sticky-Aktionsleiste (§6.12): erscheint, sobald Hero-CTAs und Kontaktsektion nicht sichtbar sind
const visible = ref(false)
const observers: IntersectionObserver[] = []

onMounted(() => {
  const heroCtas = document.getElementById('hero-ctas')
  const contact = document.getElementById('kontakt')
  if (!heroCtas || !contact || !('IntersectionObserver' in window)) {
    visible.value = true
    return
  }
  let heroVisible = true
  let contactVisible = false
  const render = () => { visible.value = !heroVisible && !contactVisible }
  const watchEl = (el: Element, cb: (v: boolean) => void) => {
    const io = new IntersectionObserver(([entry]) => { cb(!!entry?.isIntersecting); render() })
    io.observe(el)
    observers.push(io)
  }
  watchEl(heroCtas, (v) => { heroVisible = v })
  watchEl(contact, (v) => { contactVisible = v })
})

onBeforeUnmount(() => observers.forEach(io => io.disconnect()))
</script>

<template>
  <div id="action-bar" class="action-bar" :class="{ 'is-visible': visible }">
    <UiButton :href="links.tel" block icon="phone">Anrufen</UiButton>
    <UiButton :href="links.whatsapp" variant="whatsapp" block icon="message" target="_blank" rel="noopener">WhatsApp</UiButton>
  </div>
</template>
