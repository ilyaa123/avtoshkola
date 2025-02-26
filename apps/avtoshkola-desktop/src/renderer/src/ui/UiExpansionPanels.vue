<script setup lang="ts">
type Panel = {
  title: string
  key: string
}

interface Props {
  panels: Panel[]
}

defineProps<Props>()

const opened = defineModel<string[]>({
  default: () => []
})

const toggleOpened = (key: string) => {
  if (opened.value.includes(key)) {
    opened.value = [...opened.value].filter((item) => item != key)
  } else {
    opened.value = [...opened.value, key]
  }
}
</script>
<template>
  <div id="accordion-collapse" data-accordion="collapse">
    <template v-for="panel in panels" :key="panel.key">
      <div>
        <div>
          <button
            type="button"
            class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            @click="toggleOpened(panel.key)"
          >
            <span>{{ panel.title }}</span>
            <svg
              data-accordion-icon
              class="w-3 h-3 rotate-180 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </div>
        <div v-if="opened.includes(panel.key)">
          <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <slot :name="panel.key" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
