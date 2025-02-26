<script setup lang="ts">
import { watch } from 'vue'
const isOpen = defineModel<boolean>({
  default: false
})

const closeModal = () => {
  isOpen.value = false
}

watch(isOpen, (newValue) => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  if (newValue) {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
  } else {
    document.documentElement.style.overflow = ''
    document.body.style.paddingRight = ''
  }
})
</script>

<template>
  <slot name="activator" :attr="{ onClick: () => (isOpen = true) }" />

  <teleport to="#modals">
    <transition name="modal-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-800 max-w-2xl w-full p-6">
          <button
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            @click="closeModal"
          >
            ✖
          </button>
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
