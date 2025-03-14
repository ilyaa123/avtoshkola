<script setup lang="ts">
import { onMounted, ref } from 'vue'

import UiCard from '@renderer/ui/UiCard.vue'

import { useAuth } from '@renderer/store/auth'

import { pluralize } from '@renderer/utils/pluralize'

import type { Ticket } from '@renderer/types/entities'

const today = new Date()
today.setHours(0, 0, 0, 0)

const { user } = useAuth()

const totalTicketsCount = ref(0)
const solvedTicketsCount = ref(0)

const averageTicketsScore = ref(0)
const maxTicketsScore = ref(0)

const practicesCount = ref(0)
const weekPracticesCount = ref(0)

const lastSolvedTicket = ref<Ticket | null>(null)

const totalTopicsAnswers = ref(0)
const totalTopicsQuestions = ref(0)

const getTotalTicketsCount = async () => {
  const allTickets = await window.api.questions.getAllTickets(user.value!.category)
  totalTicketsCount.value = allTickets.length
}

const getSolvedTicketsCount = async () => {
  const findedSolvedTicketsCount = await window.api.questions.getSolvedTicketsCount()

  solvedTicketsCount.value = findedSolvedTicketsCount
}

const getAverageTicketsScore = async () => {
  const findedAverageTicketsScore = await window.api.questions.getAverageMaxTicketsScore()
  averageTicketsScore.value = findedAverageTicketsScore.average
  maxTicketsScore.value = findedAverageTicketsScore.max
}

const getPractices = async () => {
  const findedPractices = await window.api.practices.getPractices({
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  })
  practicesCount.value = findedPractices.length
}

const getWeekPractices = async () => {
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay() + 1)

  const endOfWeek = new Date(today)
  endOfWeek.setDate(startOfWeek.getDate() + 6)

  const findedPractices = await window.api.practices.getPractices({
    month: today.getMonth(),
    year: today.getFullYear()
  })

  const weekPractices = findedPractices.filter((practice) => {
    const practiceDate = new Date(practice.year, practice.month, practice.day)
    practiceDate.setHours(0, 0, 0, 0)

    return practiceDate >= startOfWeek && practiceDate <= endOfWeek && practiceDate >= today
  })

  weekPracticesCount.value = weekPractices.length
}

const getLastSolvedTicket = async () => {
  const findedLastSolvedTicket = await window.api.questions.getLastSolvedTicket(
    user.value!.category
  )

  lastSolvedTicket.value = findedLastSolvedTicket
}

const getTopicsTotals = async () => {
  const findedTopicsTotals = await window.api.questions.getTopicsTotals(user.value!.category)
  totalTopicsAnswers.value = findedTopicsTotals?.totalAnswers
  totalTopicsQuestions.value = findedTopicsTotals?.totalQuestions
}

onMounted(() => {
  getTotalTicketsCount()
  getSolvedTicketsCount()
  getAverageTicketsScore()
  getPractices()
  getWeekPractices()
  getLastSolvedTicket()
  getTopicsTotals()
})
</script>
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
    <ui-card class="h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="font-semibold">Решено экзаменационных билетов:</h3>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ solvedTicketsCount }} / {{ totalTicketsCount }}
      </p>
    </ui-card>

    <ui-card class="h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="font-semibold">Решено экзаменационных вопросов из разделов:</h3>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ totalTopicsAnswers }} / {{ totalTopicsQuestions }}
      </p>
    </ui-card>

    <ui-card class="h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="font-semibold">Запланированные занятия на сегодня:</h3>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ practicesCount }} {{ pluralize(practicesCount, 'занятие', 'занятия', 'занятий') }}
      </p>
    </ui-card>

    <ui-card class="h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="font-semibold">Средний балл за тесты:</h3>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ averageTicketsScore }} / {{ maxTicketsScore }}
      </p>
    </ui-card>

    <ui-card class="h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="font-semibold">Последний сохранённый билет:</h3>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ lastSolvedTicket?.ticket_number || 'Не найдено' }}
      </p>
    </ui-card>

    <ui-card class="h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="font-semibold">Запланированные занятия на неделю:</h3>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        {{ weekPracticesCount }} {{ pluralize(practicesCount, 'занятие', 'занятия', 'занятий') }}
      </p>
    </ui-card>
  </div>
</template>
