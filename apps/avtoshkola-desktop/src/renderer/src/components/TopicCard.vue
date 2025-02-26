<script setup lang="ts">
import UiCard from '@renderer/ui/UiCard.vue'

interface Props {
  topicId: string
  topicName: string
  questionsLength: number
  savedCorrectCount: number
}

defineProps<Props>()
</script>
<template>
  <router-link :to="`/teory/questions/topics/${topicId}`">
    <ui-card
      class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
      style="min-width: 160px; width: 100%"
    >
      {{ topicName }}
      <p>{{ savedCorrectCount }} / {{ questionsLength }}</p>
    </ui-card>
  </router-link>
</template>
