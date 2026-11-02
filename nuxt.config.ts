import tailwindcss from '@tailwindcss/vite'

// GitHub Pages (Project Page): https://meowwwdev.github.io/testpaper/
// Lokal ohne Präfix testen: NUXT_APP_BASE_URL=/ npm run generate
const baseURL = process.env.NUXT_APP_BASE_URL || '/testpaper/'

const themeScript = `(function(d){d.classList.add('js');var t;try{t=localStorage.getItem('mv-theme')}catch(e){}`
  + `if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t})(document.documentElement)`

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },

  // Rein statisch (SSG): `nuxt generate` rendert alle Seiten vor, GitHub Pages liefert nur Dateien aus.
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/', '/impressum', '/datenschutz'],
      crawlLinks: true,
      failOnError: true,
    },
  },

  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'de' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#FAF7F2' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${baseURL}assets/logo-signet.svg` }],
      // Progressive Enhancement: CSS-Fallbacks greifen ohne JS, `.js` schaltet die interaktiven Varianten frei.
      // Theme vor dem ersten Rendern setzen (kein Aufblitzen): gespeicherte Wahl, sonst Systemeinstellung.
      // Schlüssel und Logik spiegeln app/composables/useColorTheme.ts.
      script: [{ innerHTML: themeScript, tagPosition: 'head' }],
    },
  },
})
