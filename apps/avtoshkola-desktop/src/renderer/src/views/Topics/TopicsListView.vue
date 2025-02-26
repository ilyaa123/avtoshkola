<script setup lang="ts">
import { onMounted, ref } from 'vue'

import TopicCard from '@renderer/components/TopicCard.vue'

import { useAuth } from '@renderer/store/auth'

import type { Topics } from 'avtoshkola-pdd'

const { user } = useAuth()

const topics = ref<Topics>([])

const savedTopics = ref<{ topic_id: string; count: number }[]>([])

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
      <topic-card
        v-for="topic in topics"
        :key="topic.topic_name"
        :topic-id="topic.id"
        :topic-name="topic.topic_name"
        :questions-length="topic.questions.length"
        :saved-correct-count="savedTopics.find((item) => item.topic_id == topic.id)?.count || 0"
      />
    </div>
  </section>
</template>
