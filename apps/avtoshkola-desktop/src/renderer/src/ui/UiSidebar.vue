<script setup lang="ts">
type MenuItem = {
  title: string
  to: string
}

interface Props {
  title?: string
  menu?: MenuItem[]
}

withDefaults(defineProps<Props>(), {
  menu: () => []
})
</script>
<template>
  <aside
    id="default-sidebar"
    class="z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div
      class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
    >
      <div v-if="title" class="mb-4">
        <router-link to="/">
          <h2 class="p-2 ms-3 text-2xl">{{ title }}</h2>
        </router-link>
      </div>
      <ul class="space-y-2 font-medium">
        <li v-for="(menu_item, index) in menu" :key="index">
          <router-link
            :to="menu_item.to"
            class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <span class="ms-3">{{ menu_item.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>
