<script setup lang="ts">
interface Props {
  block?: boolean
  type?: HTMLButtonElement['type']
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="[
      block ? 'w-full' : '',
      'font-medium rounded-lg text-sm px-5 py-2.5 me-2 text-white',
      disabled ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600  '
    ]"
  >
    <slot />
  </button>
</template>
