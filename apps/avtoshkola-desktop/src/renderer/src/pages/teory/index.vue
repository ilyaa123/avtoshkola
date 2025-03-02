<script setup lang="ts">
import UiCard from '@renderer/ui/UiCard.vue'
</script>
<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
    <router-link class="h-full" to="/teory/penalties">
      <ui-card
        class="h-full flex items-center justify-center text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <h3>Штрафы</h3>
      </ui-card>
    </router-link>

    <router-link class="h-full" to="/teory/questions">
      <ui-card
        class="h-full flex items-center justify-center text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <h3>Экзаменационные вопросы</h3>
      </ui-card>
    </router-link>

    <router-link class="h-full" to="/teory/signs">
      <ui-card
        class="h-full flex items-center justify-center text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <h3>Дорожные знаки</h3>
      </ui-card>
    </router-link>
  </div>
</template>
