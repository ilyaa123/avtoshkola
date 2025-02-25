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

const topic = ref<Topic | null>(null)

const selectedAnswers = ref<SelectedAnswer[]>([])

const getTopic = async () => {
  const findedTopic = await window.api.questions.getTopic(props.topicId, user.value!.category)

  topic.value = findedTopic
}

onMounted(() => {
  getTopic()
})

onBeforeUnmount(() => {
  try {
    window.api.questions.saveTopicAnswers(props.topicId, deepClone(selectedAnswers.value))
  } catch (error) {
    console.log('🚀 ~ onBeforeUnmount ~ error:', error)
  }
})
</script>
<template>
  <section>
    <template v-if="topic">
      <ui-questions-stepper v-model:answers="selectedAnswers" :questions="topic.questions">
        <template #prepend>
          <h3 class="text-center text-white font-semibold text-lg mb-2">
            {{ topic?.topic_name }}
          </h3>
        </template>
      </ui-questions-stepper>
    </template>
  </section>
</template>
