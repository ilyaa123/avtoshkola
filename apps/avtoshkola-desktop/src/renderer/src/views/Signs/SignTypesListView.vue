<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import UiExpansionPanels from '@renderer/ui/UiExpansionPanels.vue'

import type { SignTypes } from 'avtoshkola-pdd'

const singTypesList = ref<SignTypes>([])

const signPanelList = computed(() =>
  singTypesList.value.map((item) => ({
    title: item,
    key: item
  }))
)

const getSygnTypes = async () => {
  const signTypes = await window.api.signs.getSygnTypes()
  singTypesList.value = signTypes
}

onMounted(() => {
  getSygnTypes()
})
</script>
<template>
  <section>
    <h3 class="text-lg mb-2">Дорожные знаки</h3>
    <ui-expansion-panels :panels="signPanelList">
      <template v-for="type in singTypesList" :key="type" #[`${type}`]>
        <slot :type="type" />
      </template>
    </ui-expansion-panels>
  </section>
</template>
