<script setup lang="ts">
interface Props {
  variant?: 'base' | 'success' | 'error'
}

withDefaults(defineProps<Props>(), {
  variant: 'base'
})
</script>
<template>
  <div
    class="block p-6 border rounded-lg shadow bg-white text-gray-900 dark:text-white dark:bg-gray-800"
    :class="{
      'border-gray-200 dark:border-gray-700': variant === 'base',
      'border-red-600': variant === 'error',
      'border-green-600': variant === 'success'
    }"
  >
    <slot />
  </div>
</template>
