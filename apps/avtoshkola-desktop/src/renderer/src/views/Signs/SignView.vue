<script setup lang="ts">
import { onMounted, ref } from 'vue'

import transformImagePath from '@renderer/utils/transformImagePath'

import type { Sign } from '@renderer/types/entities'

interface Props {
  type: string
  number: string
}

const props = defineProps<Props>()

const sign = ref<Sign | null>(null)

const getSign = async () => {
  const findedSign = await window.api.signs.getSign(props.type, props.number)
  sign.value = findedSign
}

onMounted(() => {
  getSign()
})
</script>
<template>
  <div v-if="sign" class="flex flex-col items-center text-center gap-4">
    <h4 class="font-semibold">{{ sign.number }} {{ sign.title }}</h4>
    <img
      :src="transformImagePath(sign.image.replace('./images/', '/pdd/'))"
      style="max-width: 320px; width: 100%"
      alt="Sign"
    />
    <p class="px-2" style="max-height: 220px; overflow-y: auto">{{ sign.description }}</p>
  </div>
</template>
