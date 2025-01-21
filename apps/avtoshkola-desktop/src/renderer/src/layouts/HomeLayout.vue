<script setup lang="ts">
import UiNavBar from '@renderer/ui/UiNavBar.vue'
import UiSidebar from '@renderer/ui/UiSidebar.vue'

// Определяем меню для боковой панели
const menu = [
  {
    title: 'Теория',
    to: '/teory'
  },
  {
    title: 'Практика',
    to: '/practic'
  }
]
</script>

<template>
  <div class="flex items-start justify-start">
    <!-- Боковая панель -->
    <ui-sidebar class="flex-grow" title="ДрайвСтарт" :menu="menu" />
    <!-- Основная область -->
    <div class="w-full">
      <!-- Верхняя панель навигации -->
      <ui-nav-bar />
      <!-- Динамическое содержимое для текущего маршрута -->
      <router-view />
    </div>
  </div>
</template>
