<script setup lang="ts">
import UiCard from '@renderer/ui/UiCard.vue'
import { computed } from 'vue'

interface Props {
  ticketId: string
  ticketNumber: string
  questionsLength: number
  savedCorrectCount?: number | null
}

const props = defineProps<Props>()

const variant = computed(() => {
  if (!props.savedCorrectCount) return 'base'
  return props.savedCorrectCount < props.questionsLength - 2 ? 'error' : 'success'
})
</script>
<template>
  <router-link :to="`/teory/questions/tickets/${ticketId}`">
    <ui-card
      class="flex items-center justify-center flex-col cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-center h-full"
      :variant="variant"
    >
      <p>{{ ticketNumber }}</p>
      <p v-if="savedCorrectCount">{{ savedCorrectCount }} / {{ questionsLength }}</p>
    </ui-card>
  </router-link>
</template>
