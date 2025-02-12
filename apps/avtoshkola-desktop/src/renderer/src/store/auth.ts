import { User } from '@renderer/types/user'

import { computed, ref } from 'vue'

const user = ref<User | null>(null)

export const useAuth = () => {
  const isAuth = computed(() => !!user.value)

  const setUser = (value: User | null) => {
    user.value = value
  }

  return {
    isAuth,
    user,
    setUser
  }
}
