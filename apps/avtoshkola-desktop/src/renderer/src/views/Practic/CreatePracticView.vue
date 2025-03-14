<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import UiCard from '@renderer/ui/UiCard.vue'
import UiButton from '@renderer/ui/UiButton.vue'

import { useEventBus } from '@renderer/utils/eventBas'

import type { Practic } from '@renderer/types/practices'

interface Props {
  day: number
  month: number
  year: number
}

const monthNames = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря'
]

const DURATION = 1.5

const emits = defineEmits<{
  (e: 'created'): void
}>()

const props = defineProps<Props>()

const { emit } = useEventBus()

const selectedHour = ref<number | null>(null)

const practices = ref<Practic[]>([])

const monthName = computed(() => monthNames[props.month])

const allHours = computed(() => Array.from({ length: 6 }, (_, i) => 9 + i * DURATION))

const takenHours = computed(() => practices.value.map((practic) => practic.hour))

const today = new Date()

const isPastDate = computed(() => {
  const selectedDate = new Date(props.year, props.month, props.day).setHours(0, 0, 0, 0)
  const todayDate = new Date(today).setHours(0, 0, 0, 0)

  return selectedDate < todayDate
})
const isToday = computed(() => {
  return (
    props.day === today.getDate() &&
    props.month === today.getMonth() &&
    props.year === today.getFullYear()
  )
})

const availableHours = computed(() => {
  let filteredHours = allHours.value.filter((hour) => !takenHours.value.includes(hour))

  if (isToday.value) {
    const currentHour = today.getHours() + today.getMinutes() / 60
    filteredHours = filteredHours.filter((hour) => hour > currentHour)
  }

  return filteredHours
})

const getPractices = async () => {
  const foundPractices = await window.api.practices.getPractices({
    day: props.day,
    month: props.month,
    year: props.year
  })
  practices.value = foundPractices
}

const createPractic = async () => {
  try {
    await window.api.practices.createPractic({
      day: props.day,
      month: props.month,
      year: props.year,
      hour: selectedHour.value!,
      duration: DURATION
    })

    emits('created')
    emit('practics:updated')
  } catch (error) {
    console.log('🚀 ~ createPractic ~ error:', error)
  }
}

onMounted(() => {
  getPractices()
})
</script>

<template>
  <div class="mt-2">
    <ui-card class="text-lg mb-4"> {{ day }} {{ monthName }} {{ year }} </ui-card>

    <div v-if="practices.length === 0" class="p-4 mb-4">Нет запланированных занятий</div>

    <ui-card v-else class="p-4 mb-4">
      <div class="font-semibold">
        {{ isPastDate ? 'Прошедшие занятия:' : 'Запланированные занятия:' }}
      </div>
      <ul class="list-disc pl-4 mt-2">
        <li v-for="practic in practices" :key="practic.id">
          {{ Math.floor(practic.hour) }}:{{ practic.hour % 1 === 0.5 ? '30' : '00' }} (
          {{ practic.duration }} ч)
        </li>
      </ul>
    </ui-card>

    <template v-if="!isPastDate && availableHours.length > 0">
      <div class="grid grid-cols-1 md:grid-flow-col sm:grid-cols-2 md:grid-cols-none gap-2 mb-2">
        <button
          v-for="hour in availableHours"
          :key="hour"
          class="border rounded-lg px-3 py-2"
          :class="{ 'bg-blue-700 text-white': selectedHour === hour }"
          @click="selectedHour = selectedHour === hour ? null : hour"
        >
          {{ Math.floor(hour) }}:{{ hour % 1 === 0.5 ? '30' : '00' }}
        </button>
      </div>
      <ui-button block :disabled="!selectedHour" @click="createPractic">Добавить</ui-button>
    </template>
  </div>
</template>
