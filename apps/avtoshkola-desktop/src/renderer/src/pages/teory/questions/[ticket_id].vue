<script setup lang="ts">
import TicketView from '@renderer/views/Tickets/TicketView.vue'

import { useRoute } from 'vue-router'

const route = useRoute()

const ticketId = route.params.ticket_id as string
</script>
<template>
  <ticket-view :ticket-id="ticketId" />
</template>
