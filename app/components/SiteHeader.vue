<script setup lang="ts">
// Header (§6.1): Schatten ab 8 px Scroll, Scroll-Spy, mobiles Menü mit Focus-Trap, Esc und Body-Scroll-Lock
const route = useRoute()

const isScrolled = ref(false)
const menuOpen = ref(false)
const activeId = ref<string | null>(null)
const toggle = useTemplateRef<HTMLButtonElement>('toggle')
const mobileNav = useTemplateRef<HTMLElement>('mobileNav')

useHead({ bodyAttrs: { class: computed(() => menuOpen.value ? 'nav-open' : '') } })

function setOpen(open: boolean) {
  menuOpen.value = open
  if (open) nextTick(() => mobileNav.value?.querySelector('a')?.focus())
}

function onMobileNavClick(e: MouseEvent) {
  if ((e.target as HTMLElement).closest('a')) setOpen(false)
}

function onKeydown(e: KeyboardEvent) {
  if (!menuOpen.value || !toggle.value || !mobileNav.value) return
  if (e.key === 'Escape') { setOpen(false); toggle.value.focus(); return }
  if (e.key !== 'Tab') return
  const focusables = [toggle.value, ...mobileNav.value.querySelectorAll<HTMLElement>('a, button')]
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
}

function onScroll() {
  isScrolled.value = window.scrollY > 8
}

let spy: IntersectionObserver | undefined
let desktop: MediaQueryList | undefined
const onDesktopChange = (mq: MediaQueryListEvent) => { if (mq.matches) setOpen(false) }

function observeSections() {
  spy?.disconnect()
  activeId.value = null
  if (route.path !== '/' || !('IntersectionObserver' in window)) return
  spy = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) activeId.value = entry.target.id
    }
  }, { rootMargin: '-45% 0px -50% 0px' })
  for (const { id } of mainNav) {
    const section = document.getElementById(id)
    if (section) spy.observe(section)
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
  desktop = window.matchMedia('(min-width: 1024px)')
  desktop.addEventListener('change', onDesktopChange)
  onScroll()
  observeSections()
})

watch(() => route.path, () => nextTick(observeSections))

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
  desktop?.removeEventListener('change', onDesktopChange)
  spy?.disconnect()
})
</script>

<template>
  <header id="site-header" class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="container site-header__inner">
      <SiteLogo aria-label="Maler Vogel – zum Seitenanfang" />

      <nav class="main-nav" aria-label="Hauptnavigation">
        <ul>
          <li v-for="item in mainNav" :key="item.id">
            <SectionLink :id="item.id" :aria-current="activeId === item.id ? 'true' : undefined">{{ item.label }}</SectionLink>
          </li>
        </ul>
      </nav>
      <UiButton class="site-header__cta" :href="links.tel" icon="phone">
        <span class="ph">[TELEFON]</span>
      </UiButton>

      <div class="site-header__actions">
        <a class="icon-btn icon-btn--call" :href="links.tel" aria-label="Maler Vogel anrufen: [TELEFON]">
          <AppIcon name="phone" />
        </a>
        <button
          ref="toggle"
          class="icon-btn"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="menuOpen ? 'Menü schließen' : 'Menü öffnen'"
          @click="setOpen(!menuOpen)"
        >
          <AppIcon :name="menuOpen ? 'x' : 'menu'" />
        </button>
      </div>
    </div>

    <nav
      id="mobile-nav"
      ref="mobileNav"
      class="mobile-nav"
      :class="{ 'is-open': menuOpen }"
      aria-label="Hauptnavigation mobil"
      @click="onMobileNavClick"
    >
      <ul>
        <li v-for="item in mainNav" :key="item.id">
          <SectionLink :id="item.id">{{ item.label }}</SectionLink>
        </li>
      </ul>
      <div class="mobile-nav__cta">
        <UiButton :href="links.tel" size="lg" block icon="phone">Jetzt anrufen</UiButton>
        <span class="t-small t-muted"><span class="ph">[TELEFON]</span></span>
      </div>
    </nav>
  </header>
</template>
