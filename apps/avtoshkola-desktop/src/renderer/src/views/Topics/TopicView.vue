<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import UiQuestionsStepper from '@renderer/ui/UiQuestionsStepper.vue'

import { useAuth } from '@renderer/store/auth'

import deepClone from '@renderer/utils/deepClone'

import type { Topic } from 'avtoshkola-pdd'
import type { SelectedAnswer } from '@renderer/types/answers'

interface Props {
  topicId: string
}

const props = defineProps<Props>()

const { user } = useAuth()

const pointer = ref(0)

const topic = ref<Topic | null>(null)

const savedAnswers = ref<SelectedAnswer[]>([])

const selectedAnswers = ref<SelectedAnswer[]>([])

const getTopic = async () => {
  const findedTopic = await window.api.questions.getTopic(props.topicId, user.value!.category)

  topic.value = findedTopic
}

const getSavedAnswers = async () => {
  const findedAnswers = await window.api.questions.getTopicAnswers(props.topicId)
  savedAnswers.value = [...findedAnswers.data]
  selectedAnswers.value = [...findedAnswers.data]
  pointer.value = findedAnswers.data.length
}

onMounted(() => {
  getTopic()
  getSavedAnswers()
})

onBeforeUnmount(() => {
  try {
    if (selectedAnswers.value.length > savedAnswers.value.length) {
      window.api.questions.saveTopicAnswers(props.topicId, deepClone(selectedAnswers.value))
    }
  } catch (error) {
    console.log('🚀 ~ onBeforeUnmount ~ error:', error)
  }
})
</script>
<template>
  <section>
    <template v-if="topic">
      <ui-questions-stepper
        v-model:pointer="pointer"
        v-model:answers="selectedAnswers"
        :questions="topic.questions"
      >
        <template #prepend>
          <h3 class="text-center text-white font-semibold text-lg mb-2">
            {{ topic?.topic_name }}
          </h3>
        </template>
      </ui-questions-stepper>
    </template>
  </section>
</template>
