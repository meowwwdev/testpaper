<script setup lang="ts">
// Kontaktformular (§6.9b): Validierung beim Verlassen eines Feldes, Fehlerzusammenfassung, Lade-, Fehler- und Erfolgszustand.
// Versand: POST an /api/contact (Backend folgt, siehe §6.9). Ohne Backend zeigt das Formular den Fehlerzustand.
type FieldId = 'name' | 'email' | 'topic' | 'message' | 'consent'

const action = '/api/contact'
const topics = ['Innenanstrich', 'Fassade', 'Tapezieren', 'Lackierarbeiten', 'Kreative Techniken', 'Schimmelsanierung', 'Etwas anderes']
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const values = reactive({ name: '', phone: '', email: '', topic: '', message: '', consent: false, website: '' })
const rules: Record<FieldId, () => boolean> = {
  name: () => values.name.trim().length > 0,
  email: () => emailRe.test(values.email.trim()),
  topic: () => values.topic !== '',
  message: () => values.message.trim().length > 0,
  consent: () => values.consent,
}
const fieldIds = Object.keys(rules) as FieldId[]
const inputIds: Record<FieldId, string> = { name: 'f-name', email: 'f-email', topic: 'f-topic', message: 'f-msg', consent: 'f-consent' }

const touched = reactive<Partial<Record<FieldId, boolean>>>({})
const invalid = computed(() => Object.fromEntries(fieldIds.map(id => [id, !!touched[id] && !rules[id]()])) as Record<FieldId, boolean>)

const busy = ref(false)
const showSummary = ref(false)
const showError = ref(false)
const sent = ref(false)
const successTitle = ref('Danke!')
const successHeading = useTemplateRef<HTMLHeadingElement>('successHeading')

const touch = (id: FieldId) => { touched[id] = true }

async function onSubmit(e: Event) {
  const form = e.target as HTMLFormElement
  showError.value = false
  fieldIds.forEach(touch)
  const firstInvalid = fieldIds.find(id => !rules[id]())
  showSummary.value = !!firstInvalid
  if (firstInvalid) {
    document.getElementById(inputIds[firstInvalid])?.focus()
    return
  }

  const data = new FormData(form)
  busy.value = true
  try {
    const res = await fetch(action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const firstName = values.name.trim().split(/\s+/)[0]
    successTitle.value = firstName ? `Danke, ${firstName}!` : 'Danke!'
    sent.value = true
    await nextTick()
    successHeading.value?.focus()
  }
  catch {
    busy.value = false
    showError.value = true
  }
}
</script>

<template>
  <div class="form-card" id="form-card" :hidden="sent">
    <h3 class="t-h3">Projekt anfragen</h3>
    <p class="t-small t-muted">Felder mit * sind Pflicht.</p>
    <form id="contact-form" class="form" :action="action" method="post" novalidate @submit.prevent="onSubmit">
      <div class="form__row">
        <div class="field">
          <label for="f-name">Name *</label>
          <input
            id="f-name" v-model="values.name" name="name" type="text" autocomplete="name" required
            :disabled="busy" :aria-invalid="invalid.name" aria-describedby="f-name-err" @blur="touch('name')"
          >
          <p id="f-name-err" class="field__error" :hidden="!invalid.name"><AppIcon name="alert" /><span>Bitte geben Sie Ihren Namen an.</span></p>
        </div>
        <div class="field">
          <label for="f-phone">Telefon</label>
          <input
            id="f-phone" v-model="values.phone" name="phone" type="tel" autocomplete="tel" inputmode="tel"
            :disabled="busy" aria-describedby="f-phone-help"
          >
          <p id="f-phone-help" class="field__help">Für schnelle Rückfragen</p>
        </div>
      </div>
      <div class="field">
        <label for="f-email">E-Mail *</label>
        <input
          id="f-email" v-model="values.email" name="email" type="email" autocomplete="email" required
          :disabled="busy" :aria-invalid="invalid.email" aria-describedby="f-email-err" @blur="touch('email')"
        >
        <p id="f-email-err" class="field__error" :hidden="!invalid.email"><AppIcon name="alert" /><span>Bitte geben Sie eine gültige E-Mail-Adresse an, z. B. name@beispiel.de.</span></p>
      </div>
      <div class="field">
        <label for="f-topic">Was haben Sie vor? *</label>
        <select
          id="f-topic" v-model="values.topic" name="topic" required
          :disabled="busy" :aria-invalid="invalid.topic" aria-describedby="f-topic-err" @blur="touch('topic')"
        >
          <option value="">Bitte wählen</option>
          <option v-for="topic in topics" :key="topic">{{ topic }}</option>
        </select>
        <p id="f-topic-err" class="field__error" :hidden="!invalid.topic"><AppIcon name="alert" /><span>Bitte wählen Sie aus, worum es geht.</span></p>
      </div>
      <div class="field">
        <label for="f-msg">Nachricht *</label>
        <textarea
          id="f-msg" v-model="values.message" name="message" rows="5" required placeholder="z. B. 3 Zimmer, ca. 80 m², ab Mitte März"
          :disabled="busy" :aria-invalid="invalid.message" aria-describedby="f-msg-err" @blur="touch('message')"
        />
        <p id="f-msg-err" class="field__error" :hidden="!invalid.message"><AppIcon name="alert" /><span>Bitte beschreiben Sie kurz Ihr Vorhaben.</span></p>
      </div>
      <div class="field">
        <div class="check">
          <input
            id="f-consent" v-model="values.consent" name="consent" type="checkbox" required
            :disabled="busy" :aria-invalid="invalid.consent" aria-describedby="f-consent-err" @blur="touch('consent')"
          >
          <label for="f-consent">Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. Mehr in der <NuxtLink class="link" to="/datenschutz">Datenschutzerklärung</NuxtLink>. *</label>
        </div>
        <p id="f-consent-err" class="field__error" :hidden="!invalid.consent"><AppIcon name="alert" /><span>Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.</span></p>
      </div>
      <div class="hp" aria-hidden="true">
        <label for="f-website">Bitte leer lassen</label>
        <input id="f-website" v-model="values.website" name="website" type="text" tabindex="-1" autocomplete="off">
      </div>

      <p id="form-summary" class="alert alert--error" role="alert" :hidden="!showSummary"><AppIcon name="alert" /><span>Bitte prüfen Sie die markierten Felder.</span></p>
      <p id="form-error" class="alert alert--error" role="alert" :hidden="!showError"><AppIcon name="alert" /><span>Das hat leider nicht geklappt. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an: <span class="ph">[TELEFON]</span>.</span></p>

      <UiButton id="form-submit" type="submit" size="lg" block :disabled="busy" :aria-busy="busy">
        <span v-if="busy" class="spinner" />
        <AppIcon v-else name="send" />
        <span>Anfrage senden</span>
      </UiButton>
    </form>
  </div>
  <div id="form-success" class="form-success" aria-live="polite" :hidden="!sent">
    <AppIcon name="check-circle" />
    <h3 id="form-success-title" ref="successHeading" class="t-h3" tabindex="-1">{{ successTitle }}</h3>
    <p>Ihre Anfrage ist bei uns angekommen. Wir melden uns in der Regel innerhalb von <span class="ph">[24 Stunden]</span>. Eilig? Rufen Sie uns an: <a class="link" :href="links.tel"><span class="ph">[TELEFON]</span></a></p>
  </div>
</template>
