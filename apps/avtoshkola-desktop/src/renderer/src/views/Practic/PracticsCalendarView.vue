<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

import UiCalendar from '@renderer/ui/UiCalendar.vue'

import { useEventBus } from '@renderer/utils/eventBas'

import type { Practic } from '@renderer/types/practices'

const emits = defineEmits<{
  (e: 'select:item', value: { day: number; month: number; year: number }): void
}>()

const { on, off } = useEventBus()

const practices = ref<Practic[]>([])

const currentMonth = ref(new Date().getMonth())

const getPractics = async () => {
  const findedPractices = await window.api.practices.getPractices({
    month: currentMonth.value
  })
  practices.value = findedPractices
}

watch(currentMonth, () => {
  getPractics()
})

onMounted(() => {
  getPractics()
  on('practics:updated', getPractics)
})

onUnmounted(() => {
  off('practics:updated', getPractics)
})
</script>
<template>
  <section>
    <ui-calendar
      v-model:month="currentMonth"
      :budget-items="practices"
      @click:item="(val) => emits('select:item', val)"
    />
  </section>
</template>
