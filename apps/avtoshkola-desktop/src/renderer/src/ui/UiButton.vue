<script setup lang="ts">
interface Props {
  block?: boolean
  type?: HTMLButtonElement['type']
}

withDefaults(defineProps<Props>(), {
  type: 'button'
})
</script>
<template>
  <button
    :type="type"
    :class="`${block ? 'w-full' : ''}`"
    class="font-medium rounded-lg text-sm px-5 py-2.5 me-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
  >
    <slot />
  </button>
</template>
