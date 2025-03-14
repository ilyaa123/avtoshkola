<script setup lang="ts">
import { ref } from 'vue'

import UiModal from '@renderer/ui/UiModal.vue'
import PracticsCalendarView from '@renderer/views/Practic/PracticsCalendarView.vue'
import CreatePracticView from '@renderer/views/Practic/CreatePracticView.vue'

const selectedCalendarItem = ref<{ day: number; month: number; year: number } | null>(null)
</script>
<template>
  <div>
    <practics-calendar-view @select:item="(val) => (selectedCalendarItem = val)" />
    <ui-modal
      :model-value="!!selectedCalendarItem"
      :closable="false"
      @update:model-value="selectedCalendarItem = null"
    >
      <create-practic-view
        :day="selectedCalendarItem!.day"
        :month="selectedCalendarItem!.month"
        :year="selectedCalendarItem!.year"
        @created="selectedCalendarItem = null"
      />
    </ui-modal>
  </div>
</template>
