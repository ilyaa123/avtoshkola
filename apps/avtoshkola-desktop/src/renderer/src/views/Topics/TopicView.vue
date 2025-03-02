<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import UiQuestionsStepper from '@renderer/ui/UiQuestionsStepper.vue'
import UiButton from '@renderer/ui/UiButton.vue'

import { useAuth } from '@renderer/store/auth'

import deepClone from '@renderer/utils/deepClone'

import type { SelectedAnswer } from '@renderer/types/answers'
import type { Topic } from '@renderer/types/entities'

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

const handleOnReset = async () => {
  try {
    await window.api.questions.saveTopicAnswers(props.topicId, [])
    await getSavedAnswers()
  } catch (error) {
    console.log('🚀 ~ handleOnReset ~ error:', error)
  } finally {
    selectedAnswers.value = []
    pointer.value = 0
  }
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
          <h3 class="text-center text-gray-900 dark:text-white font-semibold text-lg mb-2">
            {{ topic?.topic_name }}
          </h3>
        </template>
        <template #finish>
          <div class="text-gray-900 dark:text-white text-center py-4">
            <p class="text-lg mb-2">Результат:</p>
            <p class="text-xl mb-4">
              {{ selectedAnswers.filter((item) => !!item.is_correct).length }} /
              {{ topic.questions.length }}
            </p>
            <ui-button @click="handleOnReset">Попробовать снова</ui-button>
          </div>
        </template>
      </ui-questions-stepper>
    </template>
  </section>
</template>
