<script setup lang="ts">
import { onMounted, ref } from 'vue'

import TicketCard from '@renderer/components/TicketCard.vue'

import { useAuth } from '@renderer/store/auth'

import type { Tikets } from 'avtoshkola-pdd'

const { user } = useAuth()

const tickets = ref<Tikets>([])

const savedTickets = ref<{ ticket_id: string; is_correct_count: number }[]>([])

const getTickets = async () => {
  const allTickets = await window.api.questions.getAllTickets(user.value!.category)
  tickets.value = allTickets
}

const getAllSavedAnswers = async () => {
  const findedAnswers = await window.api.questions.getAllTicketAnswersCount()
  savedTickets.value = findedAnswers
}

onMounted(() => {
  getTickets()
  getAllSavedAnswers()
})
</script>
<template>
  <section>
    <h3 class="text-lg mb-2">Экзаменационные билеты</h3>
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-2">
      <ticket-card
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket-id="ticket.id"
        :ticket-number="ticket.ticket_number"
        :questions-length="ticket.questions.length"
        :saved-correct-count="
          savedTickets.find((item) => item.ticket_id == ticket.id)?.is_correct_count
        "
      />
    </div>
  </section>
</template>
