<script setup lang="ts">
// UiButton (§6): <NuxtLink> bei `to`, <a> bei `href`, sonst <button>
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'on-dark'
  size?: 'md' | 'lg'
  block?: boolean
  icon?: string
  href?: string
  to?: RouteLocationRaw
  type?: 'button' | 'submit'
}>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
})

const tag = computed(() => props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button')
const classes = computed(() => [
  'btn',
  `btn--${props.variant}`,
  props.size === 'lg' && 'btn--lg',
  props.block && 'btn--block',
])
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :to="to"
    :href="href"
    :type="!to && !href ? type : undefined"
  >
    <AppIcon v-if="icon" :name="icon" />
    <slot />
  </component>
</template>
