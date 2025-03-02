<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import UiQuestionsStepper from '@renderer/ui/UiQuestionsStepper.vue'
import UiButton from '@renderer/ui/UiButton.vue'

import { useAuth } from '@renderer/store/auth'

import deepClone from '@renderer/utils/deepClone'

import type { Ticket } from '@renderer/types/entities'

import type { SelectedAnswer } from '@renderer/types/answers'

interface Props {
  ticketId: string
}

const props = defineProps<Props>()

const { user } = useAuth()

const pointer = ref(0)

const ticket = ref<Ticket | null>(null)

const savedAnswers = ref<SelectedAnswer[]>([])

const selectedAnswers = ref<SelectedAnswer[]>([])

const getTicket = async () => {
  const findedTicket = await window.api.questions.getTicket(props.ticketId, user.value!.category)
  ticket.value = findedTicket
}

const getSavedAnswers = async () => {
  const findedAnswers = await window.api.questions.getTicketAnswers(props.ticketId)
  savedAnswers.value = findedAnswers.data
}

const saveAnswers = async () => {
  if (
    selectedAnswers.value.filter((item) => item.is_correct).length >
    savedAnswers.value.filter((item) => item.is_correct).length
  ) {
    window.api.questions.saveTicketAnswers(props.ticketId, deepClone(selectedAnswers.value))
  }
}

const handleOnReset = async () => {
  try {
    await saveAnswers()
    await getSavedAnswers()
  } catch (error) {
    console.log('🚀 ~ handleOnReset ~ error:', error)
  } finally {
    selectedAnswers.value = []
    pointer.value = 0
  }
}

onMounted(() => {
  getTicket()
  getSavedAnswers()
})

onBeforeUnmount(() => {
  saveAnswers()
})
</script>
<template>
  <section>
    <template v-if="!!ticket">
      <ui-questions-stepper
        v-model:pointer="pointer"
        v-model:answers="selectedAnswers"
        :questions="ticket.questions"
      >
        <template #prepend>
          <h3 class="text-center text-gray-900 dark:text-white font-semibold text-lg mb-2">
            {{ ticket.ticket_number }}
          </h3>
        </template>
        <template #finish>
          <div class="text-gray-900 dark:text-white text-center py-4">
            <p class="text-lg">
              {{ selectedAnswers.filter((item) => !!item.is_correct).length }} /
              {{ ticket.questions.length }}
            </p>
            <p class="text-xl mb-4">
              Билет
              {{
                selectedAnswers.filter((item) => !!item.is_correct).length >=
                ticket.questions.length - 2
                  ? ''
                  : 'не'
              }}
              сдан
            </p>
            <ui-button @click="handleOnReset">Попробовать снова</ui-button>
          </div>
        </template>
      </ui-questions-stepper>
    </template>
  </section>
</template>
