<script setup lang="ts">
import { onMounted, ref } from 'vue'

import UiCard from '@renderer/ui/UiCard.vue'

import { useAuth } from '@renderer/store/auth'

import { Topics } from 'avtoshkola-pdd/dist/questions/types'

const { user } = useAuth()

const topics = ref<Topics>([])

const getTopics = async () => {
  const allTopics = await window.api.questions.getAllTopics(user.value!.category)

  topics.value = allTopics
}
onMounted(() => {
  getTopics()
})
</script>
<template>
  <section>
    <h3 class="text-lg mb-2">Разделы</h3>
    <div class="flex flex-wrap gap-2">
      <ui-card
        v-for="ticket in topics"
        :key="ticket.topic_name"
        class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
        style="min-width: 160px; width: 100%"
      >
        {{ ticket.topic_name }}
      </ui-card>
    </div>
  </section>
</template>
