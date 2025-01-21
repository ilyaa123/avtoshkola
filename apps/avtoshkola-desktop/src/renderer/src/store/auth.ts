import { User } from '@renderer/types/user'

import { computed, ref } from 'vue'

// Создаем реактивное хранилище для пользователя
const user = ref<User | null>(null)

export const useAuth = () => {
  // Если в `user` есть данные, то возвращает `true`, иначе `false`
  const isAuth = computed(() => !!user.value)

  // Функция для установки или сброса данных пользователя
  const setUser = (value: User | null) => {
    user.value = value
  }

  // Возвращаем из функции `useAuth` необходимые свойства и методы
  return {
    isAuth,
    user,
    setUser
  }
}
