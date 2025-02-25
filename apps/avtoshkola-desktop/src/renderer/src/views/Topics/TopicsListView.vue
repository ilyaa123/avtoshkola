<script setup lang="ts">
import { onMounted, ref } from 'vue'

import UiCard from '@renderer/ui/UiCard.vue'

import { useAuth } from '@renderer/store/auth'

import type { Topics } from 'avtoshkola-pdd'

const { user } = useAuth()

const topics = ref<Topics>([])

const savedTopics = ref<{ topic_id: string; is_correct_count: number }[]>([])

const getTopics = async () => {
  const allTopics = await window.api.questions.getAllTopics(user.value!.category)

  topics.value = allTopics
}

const getAllSavedAnswers = async () => {
  const findedAnswers = await window.api.questions.getAllTopicAnswersCount()
  savedTopics.value = findedAnswers
}

onMounted(() => {
  getTopics()
  getAllSavedAnswers()
})
</script>
<template>
  <section>
    <h3 class="text-lg mb-2">Разделы</h3>
    <div class="flex flex-wrap gap-2">
      <router-link
        v-for="topic in topics"
        :key="topic.topic_name"
        :to="`/teory/questions/topics/${topic.id}`"
      >
        <ui-card
          class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
          style="min-width: 160px; width: 100%"
        >
          {{ topic.topic_name }}
        </ui-card>
      </router-link>
    </div>
  </section>
</template>
