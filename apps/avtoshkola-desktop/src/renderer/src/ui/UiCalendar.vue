<script setup lang="ts">
import { computed } from 'vue'

const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

const emits = defineEmits<{
  (e: 'click:item', value: { day: number; month: number; year: number }): void
}>()

interface Props {
  budgetItems?: {
    day: number
    month: number
    year: number
  }[]
}

defineProps<Props>()

const today = new Date()

today.setHours(0, 0, 0, 0)

const currentMonth = defineModel<number>('month', {
  default: new Date().getMonth()
})
const currentYear = defineModel<number>('year', {
  default: new Date().getFullYear()
})

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const monthName = computed(() => monthNames[currentMonth.value])
const year = computed(() => currentYear.value)

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})

const firstDayOffset = computed(() => {
  return (new Date(currentYear.value, currentMonth.value, 1).getDay() + 6) % 7
})

const isToday = (day: number) => {
  return (
    day === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  )
}

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}
</script>
<template>
  <div class="w-full p-4 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md">
    <div class="flex justify-between items-center mb-4">
      <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" @click="prevMonth">
        ❮
      </button>
      <h2 class="text-lg font-semibold">{{ monthName }} {{ year }}</h2>
      <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" @click="nextMonth">
        ❯
      </button>
    </div>

    <div
      class="grid grid-cols-7 text-center text-gray-600 text-sm font-medium border-b border-gray-200 dark:border-gray-700 pb-1"
    >
      <div v-for="day in weekDays" :key="day" class="py-2">{{ day }}</div>
    </div>

    <div class="grid grid-cols-7 text-center mt-2">
      <div v-for="empty in firstDayOffset" :key="'e' + empty"></div>

      <button
        v-for="day in daysInMonth"
        :key="day"
        class="p-4 w-full text-lg relative aspect-square flex items-center justify-center rounded-lg text-gray-900 dark:text-white"
        :class="{
          'bg-blue-700 hover:bg-blue-800': isToday(day),
          'hover:bg-gray-100 dark:hover:bg-gray-800': !isToday(day)
        }"
        @click="emits('click:item', { day, month: currentMonth, year: currentYear })"
      >
        {{ day }}
        <span
          v-if="
            budgetItems?.find(
              (item) => item.day === day && item.month === currentMonth && item.year === currentYear
            )
          "
          :class="{
            'bg-blue-700': new Date(currentYear, currentMonth, day) < today,
            'bg-red-600': new Date(currentYear, currentMonth, day) >= today
          }"
          class="absolute top-1 right-1 w-3 h-3 text-[12px] text-center flex items-center justify-center md:top-2 md:right-2 md:w-4 md:h-4 rounded-full"
        >
          {{
            budgetItems?.filter(
              (item) => item.day === day && item.month === currentMonth && item.year === currentYear
            ).length
          }}
        </span>
      </button>
    </div>
  </div>
</template>
