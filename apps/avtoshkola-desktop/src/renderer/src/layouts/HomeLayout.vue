<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import UiNavBar from '@renderer/ui/UiNavBar.vue'
import UiSidebar from '@renderer/ui/UiSidebar.vue'
import UiBreadcrumbs from '@renderer/ui/UiBreadcrumbs.vue'

import { useRoute } from 'vue-router'
import { useAuth } from '@renderer/store/auth'

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

const route = useRoute()

const { user } = useAuth()

const sidebarIsOpen = ref(false)

const breadcrumbs = computed(() => {
  const breadcrumbList: { title: string; to: string }[] = []

  route.matched.forEach((record) => {
    if (record.meta.title) {
      breadcrumbList.push({
        title: record.meta.title as string,
        to: record.path
      })
    }
  })

  return breadcrumbList
})

watch(
  () => route.fullPath,
  () => {
    if (sidebarIsOpen.value) sidebarIsOpen.value = false
  }
)
</script>

<template>
  <div class="flex items-start justify-start">
    <ui-sidebar
      class="flex-grow"
      title="ДрайвСтарт"
      :menu="menu"
      :is-open="sidebarIsOpen"
      @close-sidebar="sidebarIsOpen = false"
    />
    <div class="w-full">
      <ui-nav-bar
        title="ДрайвСтарт"
        :avatar="user?.avatar"
        :login="user?.login"
        :name="user?.name"
        @toggle-sidebar="sidebarIsOpen = !sidebarIsOpen"
      />
      <div class="m-2 pt-2">
        <transition name="fade-slide" mode="out-in">
          <ui-breadcrumbs v-if="breadcrumbs.length > 1" :breadcrumbs="breadcrumbs" class="mb-4" />
        </transition>
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
