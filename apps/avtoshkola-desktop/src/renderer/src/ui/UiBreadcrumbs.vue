<script setup lang="ts">
type Breadcrumb = {
  title: string
  to: string
}

interface Props {
  breadcrumbs: Breadcrumb[]
}

defineProps<Props>()
</script>
<template>
  <nav
    class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.title"
        class="inline-flex items-center"
      >
        <div class="flex items-center">
          <svg
            v-if="index != 0"
            class="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <router-link
            :to="breadcrumb.to"
            class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            {{ breadcrumb.title }}
          </router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>
