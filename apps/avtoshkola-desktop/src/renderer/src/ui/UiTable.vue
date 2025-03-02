<script setup lang="ts">
type Header = {
  title: string
  key: string
}

interface Props {
  headers: Header[]
  items: any[]
}

defineProps<Props>()
</script>

<template>
  <div class="relative overflow-x-auto hidden md:block">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th v-for="header in headers" :key="header.key" scope="col" class="px-6 py-3">
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, i) in items"
          :key="i"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
        >
          <td
            v-for="header in headers"
            :key="i + header.key"
            class="px-6 py-4 font-medium text-gray-900 dark:text-white"
          >
            <slot :name="header.key">
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="md:hidden space-y-4">
    <div
      v-for="(item, i) in items"
      :key="i"
      class="bg-white rounded-lg shadow p-4 border dark:bg-gray-800 dark:border-gray-700"
    >
      <div v-for="header in headers" :key="i + header.key" class="flex flex-col mb-2">
        <span class="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
          {{ header.title }}
        </span>
        <span class="text-gray-700 dark:text-gray-200">
          <slot :name="header.key">
            {{ item[header.key] }}
          </slot>
        </span>
      </div>
    </div>
  </div>
</template>
