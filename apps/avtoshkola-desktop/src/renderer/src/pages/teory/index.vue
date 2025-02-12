<script setup lang="ts">
import UiCard from '@renderer/ui/UiCard.vue'
</script>
<template>
  <div class="grid grid-cols-3 gap-2">
    <router-link to="/teory/penalties">
      <ui-card class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
        <h3>Штрафы</h3>
      </ui-card>
    </router-link>

    <router-link to="/teory/questions">
      <ui-card class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
        <h3>Экзаменационные вопросы</h3>
      </ui-card>
    </router-link>

    <router-link to="/teory/signs">
      <ui-card class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
        <h3>Дорожные знаки</h3>
      </ui-card>
    </router-link>
  </div>
</template>
