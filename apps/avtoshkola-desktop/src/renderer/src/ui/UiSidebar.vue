<script setup lang="ts">
import transformImagePath from '@renderer/utils/transformImagePath'

type MenuItem = {
  title: string
  to: string
}

interface Props {
  title?: string
  menu?: MenuItem[]
  isOpen?: boolean
  img?: string
  avatar?: string
  login?: string
  name?: string
}

const emits = defineEmits(['close-sidebar', 'logout'])

withDefaults(defineProps<Props>(), {
  menu: () => []
})
</script>
<template>
  <aside
    class="z-40 h-screen transition-transform fixed md:sticky -translate-x-full md:translate-x-0 top-0"
    :class="{ 'translate-x-0': isOpen, 'w-full': isOpen }"
    style="max-width: 300px; width: 100%"
  >
    <div
      class="h-full flex flex-col px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
    >
      <div v-if="title" class="mb-4 ms-3 p-2 flex items-center justify-between">
        <router-link class="flex justify-start items-center gap-2" to="/">
          <img
            v-if="img"
            :src="transformImagePath(img)"
            :width="60"
            style="max-width: 60px; width: 100%"
          />
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
      <div class="flex flex-col justify-between items-start" style="height: inherit">
        <ul class="w-full space-y-2 font-medium">
          <li v-for="(menu_item, index) in menu" :key="index">
            <router-link
              :to="menu_item.to"
              class="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <span class="ms-3">{{ menu_item.title }}</span>
            </router-link>
          </li>
        </ul>
        <div class="w-full md:hidden">
          <div class="flex items-center ms-3">
            <img
              v-if="!!avatar"
              :src="transformImagePath(avatar)"
              class="w-8 h-8 rounded-full"
              alt="user avatar"
            />
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white">{{ login }}</span>
              <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{
                name
              }}</span>
            </div>
          </div>
          <div class="h-1 w-full bg-gray-500 rounded-lg mb-2" />
          <button
            class="block px-4 py-2 text-sm w-full rounded-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            @click="emits('logout')"
          >
            Выход
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>
