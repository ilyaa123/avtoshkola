<script setup lang="ts">
import { computed, ref } from 'vue'

import UiButton from './UiButton.vue'

import transformImagePath from '@renderer/utils/transformImagePath'

type Answer = {
  id: string
  answer_text: string
  is_correct: boolean
}

type Question = {
  id: string
  title: string
  image: string
  question: string
  answers: Answer[]
  correct_answer: string
  answer_tip: string
}

type SelectedAnswer = {
  question_id: string
  answer: number
  is_correct: boolean
  answer_tip: string
}

interface Props {
  questions: Question[]
}

const props = defineProps<Props>()

const pointer = defineModel<number>('pointer', {
  default: 0
})

const answers = defineModel<SelectedAnswer[]>('answers', {
  default: () => []
})

const selectedAnswer = ref<SelectedAnswer | null>(null)

const currentQuestion = computed(() => props.questions[pointer.value])

const isDisabled = computed(
  () => !!answers.value.find((item) => item.question_id == selectedAnswer.value?.question_id)
)

const handleOnSetPointer = (newPointer: number, question_id?: string) => {
  if (newPointer >= answers.value.length + 1) return
  const findedAnswer = answers.value.find((item) => item.question_id == question_id)
  pointer.value = newPointer
  selectedAnswer.value = findedAnswer || null
}

const handleOnSetAnswer = (answer: number, is_correct: boolean) => {
  if (isDisabled.value || selectedAnswer.value) return
  selectedAnswer.value = {
    question_id: currentQuestion.value.id,
    answer,
    is_correct,
    answer_tip: currentQuestion.value.answer_tip
  }
}

const handleOnGoNextQuestion = () => {
  if (!isDisabled.value) {
    answers.value.push(selectedAnswer.value!)
  }
  selectedAnswer.value = null
  pointer.value = answers.value.length
}
</script>
<template>
  <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
    <slot name="prepend" />
    <div class="grid grid-cols-12 mb-6">
      <div
        v-for="(question, index) in questions"
        :key="index"
        class="flex items-center justify-center h-12 transition-colors select-none"
        :class="{
          'bg-blue-600 text-white': index === pointer,
          'bg-green-500 text-white cursor-pointer':
            !!answers.find((item) => item.question_id == question.id)?.is_correct &&
            index !== pointer,
          'bg-red-500 text-white cursor-pointer':
            !!answers.find((item) => item.question_id == question.id) &&
            !answers.find((item) => item.question_id == question.id)?.is_correct &&
            index !== pointer
        }"
        @click="handleOnSetPointer(index, question.id)"
      >
        {{ index + 1 }}
      </div>
    </div>
    <div v-if="currentQuestion" class="mx-auto" style="max-width: 800px">
      <div class="flex items-center justify-center mb-4">
        <img
          :src="transformImagePath(currentQuestion.image.replace('./images/', '/pdd/'))"
          width="100%"
          alt="Dynamic Image"
        />
      </div>
      <div>
        <p class="text-gray-900 dark:text-white mb-2">{{ currentQuestion.question }}</p>
        <div class="flex flex-col items-center gap-2">
          <button
            v-for="(answer, i) in currentQuestion.answers"
            :key="answer.answer_text"
            block
            class="font-semibold px-5 py-2.5 me-2 text-gray-900 dark:text-white w-full text-left"
            :class="{
              'hover:bg-gray-200 dark:hover:bg-gray-700': !selectedAnswer,
              'bg-red-600': selectedAnswer?.answer == i && !selectedAnswer?.is_correct,
              'bg-green-500': !!selectedAnswer && answer.is_correct
            }"
            @click="handleOnSetAnswer(i, answer.is_correct)"
          >
            {{ i + 1 }}. {{ answer.answer_text }}
          </button>
        </div>

        <template v-if="!!selectedAnswer">
          <p
            class="px-5 py-2.5 me-2 mt-4 border dark:border-white border-gray-900 text-gray-900 dark:text-white rounded-lg"
          >
            {{ selectedAnswer.answer_tip }}
          </p>
          <ui-button class="mt-4" block @click="handleOnGoNextQuestion">Дальше</ui-button>
        </template>
      </div>
    </div>
    <div v-else>
      <slot name="finish" />
    </div>
  </div>
</template>
