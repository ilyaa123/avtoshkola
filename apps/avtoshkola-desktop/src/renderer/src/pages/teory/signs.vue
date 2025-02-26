<script setup lang="ts">
import { ref } from 'vue'
import UiModal from '@renderer/ui/UiModal.vue'

import SignTypesListView from '@renderer/views/Signs/SignTypesListView.vue'
import SignListView from '@renderer/views/Signs/SignListView.vue'
import SignView from '@renderer/views/Signs/SignView.vue'

const selectedSign = ref<{ type: string; number: string } | null>(null)
</script>
<template>
  <section>
    <sign-types-list-view>
      <template #default="{ type }">
        <sign-list-view :type="type" @click:sign="(number) => (selectedSign = { type, number })" />
      </template>
    </sign-types-list-view>
    <ui-modal :model-value="!!selectedSign" @update:model-value="selectedSign = null">
      <sign-view :type="selectedSign!.type" :number="selectedSign!.number" />
    </ui-modal>
  </section>
</template>
