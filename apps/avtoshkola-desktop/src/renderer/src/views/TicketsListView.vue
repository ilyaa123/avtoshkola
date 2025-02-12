<script setup lang="ts">
import { onMounted, ref } from 'vue'

import UiCard from '@renderer/ui/UiCard.vue'

import { useAuth } from '@renderer/store/auth'

import { Tikets } from 'avtoshkola-pdd/dist/questions/types'

const { user } = useAuth()

const tickets = ref<Tikets>([])

const getTicket = async () => {
  const allTickets = await window.api.questions.getAllTickets(user.value!.category)
  tickets.value = allTickets
}
onMounted(() => {
  getTicket()
})
</script>
<template>
  <section>
    <h3 class="text-lg mb-2">Экзаменационные билеты</h3>
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 gap-2">
      <ui-card
        v-for="ticket in tickets"
        :key="ticket.ticket_number"
        class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-center"
      >
        {{ ticket.ticket_number }}
      </ui-card>
    </div>
  </section>
</template>
