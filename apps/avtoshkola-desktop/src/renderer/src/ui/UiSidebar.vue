<script setup lang="ts">
type MenuItem = {
  title: string
  to: string
}

interface Props {
  title?: string
  menu?: MenuItem[]
  isOpen?: boolean
}

const emits = defineEmits(['close-sidebar'])

withDefaults(defineProps<Props>(), {
  menu: () => []
})
</script>
<template>
  <aside
    id="default-sidebar"
    class="z-40 h-screen transition-transform fixed md:sticky -translate-x-full md:translate-x-0 top-0"
    aria-label="Sidebar"
    :class="{ 'translate-x-0': isOpen, 'w-full': isOpen }"
    style="max-width: 300px; width: 100%"
  >
    <div
      class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
    >
      <div v-if="title" class="mb-4 ms-3 p-2 flex items-center justify-between">
        <router-link to="/">
          <h2 class="text-2xl">{{ title }}</h2>
        </router-link>
        <button class="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            @click="emits('close-sidebar')"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
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
