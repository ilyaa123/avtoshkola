<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import UiQuestionsStepper from '@renderer/ui/UiQuestionsStepper.vue'

import { useAuth } from '@renderer/store/auth'

import deepClone from '@renderer/utils/deepClone'

import type { Ticket } from 'avtoshkola-pdd'
import type { SelectedAnswer } from '@renderer/types/answers'

interface Props {
  ticketId: string
}

const props = defineProps<Props>()

const { user } = useAuth()

const ticket = ref<Ticket | null>(null)

const selectedAnswers = ref<SelectedAnswer[]>([])

const getTicket = async () => {
  const findedTicket = await window.api.questions.getTicket(props.ticketId, user.value!.category)
  ticket.value = findedTicket
}

onMounted(() => {
  getTicket()
})

onBeforeUnmount(() => {
  try {
    window.api.questions.saveTicketAnswers(props.ticketId, deepClone(selectedAnswers.value))
  } catch (error) {
    console.log('🚀 ~ onBeforeUnmount ~ error:', error)
  }
})
</script>
<template>
  <section>
    <template v-if="!!ticket">
      <ui-questions-stepper v-model:answers="selectedAnswers" :questions="ticket.questions">
        <template #prepend>
          <h3 class="text-center text-white font-semibold text-lg mb-2">
            {{ ticket.ticket_number }}
          </h3>
        </template>
      </ui-questions-stepper>
    </template>
  </section>
</template>
