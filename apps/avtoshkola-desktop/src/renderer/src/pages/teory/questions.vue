<script setup lang="ts">
import TicketsListView from '@renderer/views/TicketsListView.vue'
import TopicsListView from '@renderer/views/TopicsListView.vue'
</script>
<template>
  <div>
    <tickets-list-view style="margin-bottom: 20px" />
    <topics-list-view />
  </div>
</template>
