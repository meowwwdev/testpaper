<script setup lang="ts">
// Galerie + Lightbox (§6.5b) auf Basis des nativen <dialog>
export interface GalleryItem {
  /** Leistung · Objekt, z. B. „Fassadenanstrich · Einfamilienhaus“ */
  title: string
  /** Ort (Kundendaten-Platzhalter) */
  place: string
}

const props = defineProps<{ items: GalleryItem[] }>()

const lightbox = useTemplateRef<HTMLDialogElement>('lightbox')
const current = ref(0)
let opener: HTMLButtonElement | null = null
let touchX: number | null = null

const captionOf = (item: GalleryItem) => `${item.title} · ${item.place}`
const lightboxCaption = computed(() => {
  const item = props.items[current.value]
  return item ? `${captionOf(item)} (${current.value + 1} / ${props.items.length})` : ''
})

function show(i: number) {
  current.value = (i + props.items.length) % props.items.length
}

function open(i: number, e: MouseEvent) {
  const dialog = lightbox.value
  if (!dialog || typeof dialog.showModal !== 'function') return
  opener = e.currentTarget as HTMLButtonElement
  show(i)
  dialog.showModal()
}

const close = () => lightbox.value?.close()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') show(current.value - 1)
  if (e.key === 'ArrowRight') show(current.value + 1)
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === lightbox.value) close()
}

function onTouchstart(e: TouchEvent) {
  touchX = e.touches[0]?.clientX ?? null
}

function onTouchend(e: TouchEvent) {
  const endX = e.changedTouches[0]?.clientX
  if (touchX === null || endX === undefined) return
  const dx = endX - touchX
  if (Math.abs(dx) > 50) show(current.value + (dx < 0 ? 1 : -1))
  touchX = null
}
</script>

<template>
  <div class="gallery">
    <h3 class="t-h3">Weitere Projekte</h3>
    <ul class="gallery__grid">
      <li v-for="(item, i) in items" :key="item.title" class="gallery__item">
        <button class="gallery__btn" type="button" @click="open(i, $event)">
          <PhotoPlaceholder as="span" icon-size="lg" />
          <span class="gallery__overlay">{{ captionOf(item) }}</span>
          <span class="sr-only">Bild vergrößern</span>
        </button>
        <span class="t-small gallery__caption">{{ item.title }} · <span class="ph">{{ item.place }}</span></span>
      </li>
    </ul>

    <dialog
      ref="lightbox"
      class="lightbox"
      aria-label="Bildansicht"
      @keydown="onKeydown"
      @click="onBackdropClick"
      @close="opener?.focus()"
      @touchstart.passive="onTouchstart"
      @touchend="onTouchend"
    >
      <div class="lightbox__inner">
        <button class="icon-btn lightbox__close" type="button" aria-label="Schließen" @click="close">
          <AppIcon name="x" />
        </button>
        <div class="lightbox__stage">
          <PhotoPlaceholder />
        </div>
        <p class="lightbox__caption">{{ lightboxCaption }}</p>
        <div class="lightbox__nav">
          <button class="icon-btn" type="button" aria-label="Zurück" @click="show(current - 1)">
            <AppIcon name="chevron-left" />
          </button>
          <button class="icon-btn" type="button" aria-label="Weiter" @click="show(current + 1)">
            <AppIcon name="chevron-right" />
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>
