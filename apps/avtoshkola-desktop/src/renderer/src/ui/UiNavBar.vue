<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import transformImagePath from '@renderer/utils/transformImagePath'

interface Props {
  title?: string
  avatar?: string
  login?: string
  name?: string
}

const emits = defineEmits(['toggle-sidebar', 'logout'])

defineProps<Props>()

const menuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    menuOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav class="bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white m-2 rounded-md">
    <div class="flex flex-wrap items-center justify-between mx-auto p-4">
      <div>
        <router-link v-if="title" to="/" class="block md:hidden">
          <h2 class="text-2xl">{{ title }}</h2>
        </router-link>
      </div>
      <div ref="menuRef" class="flex items-center md:space-x-0 space-x-3 relative">
        <button
          id="user-menu-button"
          type="button"
          class="hidden md:flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
          @click.stop="menuOpen = !menuOpen"
        >
          <img
            v-if="!!avatar"
            :src="transformImagePath(avatar)"
            class="w-8 h-8 rounded-full"
            alt="user avatar"
          />
        </button>
        <div
          id="user-dropdown"
          class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute top-full right-0 w-max min-w-40"
          :class="{ hidden: !menuOpen }"
        >
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900 dark:text-white">{{ login }}</span>
            <span class="block text-sm text-gray-500 truncate dark:text-gray-400">{{ name }}</span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <button
                class="block px-4 py-2 text-sm text-left w-full text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                @click="emits('logout')"
              >
                Выход
              </button>
            </li>
          </ul>
        </div>
        <button
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded="false"
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          @click="emits('toggle-sidebar')"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>
