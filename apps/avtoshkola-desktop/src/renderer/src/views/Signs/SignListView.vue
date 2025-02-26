<script setup lang="ts">
import { onMounted, ref } from 'vue'

import UiCard from '@renderer/ui/UiCard.vue'

import transformImagePath from '@renderer/utils/transformImagePath'

import type { Sign } from 'avtoshkola-pdd'

interface Props {
  type: string
}

const emits = defineEmits<{
  (e: 'click:sign', value: string): void
}>()

const props = defineProps<Props>()

const signsList = ref<Sign[]>([])

const getSignsList = async () => {
  const signs = await window.api.signs.getSigns(props.type)

  signsList.value = signs
}

onMounted(() => {
  getSignsList()
})
</script>
<template>
  <section>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      <ui-card
        v-for="sign in signsList"
        :key="sign.number"
        class="cursor-pointer"
        @click="emits('click:sign', sign.number)"
      >
        <div class="w-full h-full flex flex-col items-center justify-start gap-2 text-center">
          <img :src="transformImagePath(sign.image)" style="max-height: 100px" alt="Sign" />
          {{ sign.number }} {{ sign.title }}
        </div>
      </ui-card>
    </div>
  </section>
</template>
