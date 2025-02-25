<script setup lang="ts">
import TopicView from '@renderer/views/Topics/TopicView.vue'

import { useRoute } from 'vue-router'

const route = useRoute()

const topicId = route.params.topic_id as string
</script>
<template>
  <topic-view :topic-id="topicId" />
</template>
