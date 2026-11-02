<script setup lang="ts">
const route = useRoute()
const hasActionBar = computed(() => !!route.meta.actionBar)

useHead({ bodyAttrs: { class: computed(() => hasActionBar.value ? 'has-action-bar' : '') } })
</script>

<template>
  <IconSprite />
  <a class="skip-link" href="#inhalt">Zum Inhalt springen</a>
  <SiteHeader />
  <slot />
  <SiteFooter />
  <ActionBar v-if="hasActionBar" />
</template>
