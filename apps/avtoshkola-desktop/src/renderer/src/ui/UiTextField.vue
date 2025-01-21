<script setup lang="ts">
import { useId } from 'vue'

interface Props {
  label?: string
  placeholder?: string
  type?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text'
})

const value = defineModel<string>({
  default: ''
})

const id = useId()
</script>
<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}</label
    >
    <input
      v-model="value"
      :id="id"
      :placeholder="placeholder"
      :type="type"
      :required="required"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
    />
  </div>
</template>
