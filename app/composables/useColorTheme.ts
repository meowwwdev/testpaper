// Farbschema hell/dunkel. Das Inline-Script in nuxt.config.ts setzt `data-theme` schon vor dem
// ersten Rendern; hier wird der Zustand nach dem Mounten übernommen, umgeschaltet und gespeichert.
export type ColorTheme = 'light' | 'dark'

const storageKey = 'mv-theme'
const systemQuery = '(prefers-color-scheme: dark)'

function apply(theme: ColorTheme) {
  document.documentElement.dataset.theme = theme
}

function stored(): ColorTheme | null {
  try {
    const value = localStorage.getItem(storageKey)
    return value === 'light' || value === 'dark' ? value : null
  }
  catch { return null }
}

export function useColorTheme() {
  // Beim Generieren unbekannt: bis zum Mounten `light` annehmen, damit die Hydration passt
  const theme = useState<ColorTheme>('color-theme', () => 'light')

  function set(next: ColorTheme) {
    theme.value = next
    apply(next)
    try { localStorage.setItem(storageKey, next) } catch { /* Storage gesperrt: gilt nur für diese Seite */ }
  }

  const toggle = () => set(theme.value === 'dark' ? 'light' : 'dark')

  /** Einmal im Client aufrufen: übernimmt das gesetzte Theme und folgt dem System, solange nichts gewählt wurde. */
  function init() {
    theme.value = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
    const system = window.matchMedia(systemQuery)
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (stored()) return
      theme.value = e.matches ? 'dark' : 'light'
      apply(theme.value)
    }
    system.addEventListener('change', onSystemChange)
    return () => system.removeEventListener('change', onSystemChange)
  }

  return { theme, toggle, init }
}
