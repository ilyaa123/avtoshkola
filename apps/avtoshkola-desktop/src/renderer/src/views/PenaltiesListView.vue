<script setup lang="ts">
import { onMounted, ref } from 'vue'

import UiTable from '@renderer/ui/UiTable.vue'

import type { Penalty } from 'avtoshkola-pdd'

const headers = [
  {
    title: 'Ст. КоАП',
    key: 'article_part'
  },
  {
    title: 'Правонарушение',
    key: 'text'
  },
  {
    title: 'Санкции/меры',
    key: 'penalty'
  }
]

const penalties = ref<Penalty[]>([])

const getAllPenalties = async () => {
  const allPenalties = await window.api.penalties.getAllPenalties()
  console.log('🚀 ~ getAllPenalties ~ allPenalties:', allPenalties)

  penalties.value = allPenalties
}

onMounted(() => {
  getAllPenalties()
})
</script>
<template>
  <section>
    <h3 class="text-lg mb-2">Штрафы</h3>
    <ui-table :headers="headers" :items="penalties" />
  </section>
</template>
