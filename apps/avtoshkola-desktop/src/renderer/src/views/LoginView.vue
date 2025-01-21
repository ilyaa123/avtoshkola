<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import UiCard from '@renderer/ui/UiCard.vue'
import UiTextField from '@renderer/ui/UiTextField.vue'
import UiButton from '@renderer/ui/UiButton.vue'

// Импорт кастомного composable для работы с аутентификацией
import { useAuth } from '@renderer/store/auth'

// Доступ к API для авторизации через объект window
const authApi = window.api?.auth

// Получаем экземпляр маршрутизатора
const router = useRouter()

// Достаем функцию setUser из composable useAuth
// Эта функция будет использоваться для сохранения данных пользователя
const { setUser } = useAuth()

// Создаем реактивный объект для формы авторизации
const form = reactive({
  login: '',
  password: ''
})

// Обработчик нажатия на кнопку "Войти"
const handleOnLogin = () => {
  authApi
    .login({
      login: form.login,
      password: form.password
    })
    .then((user) => {
      // Если вход успешен, сохраняем данные пользователя
      setUser(user)
      // Перенаправляем пользователя на главную страницу
      router.push('/')
    })
    .catch((err) => {
      // Логируем ошибку в случае неудачи
      console.log('🚀 ~ authApi.login ~ err:', err)
    })
}
</script>

<template>
  <!-- Карточка для формы входа -->
  <ui-card style="max-width: 400px; width: 100%">
    <!-- Заголовок формы -->
    <h1 class="text-2xl text-center mb-8">Вход</h1>
    <!-- Форма входа -->
    <form @submit.prevent="handleOnLogin">
      <!-- Поле для ввода логина -->
      <ui-text-field v-model="form.login" class="mb-5" placeholder="Логин" />
      <!-- Поле для ввода пароля -->
      <ui-text-field v-model="form.password" class="mb-5" placeholder="Пароль" type="password" />
      <!-- Кнопка отправки формы -->
      <ui-button type="submit" block>Войти</ui-button>
    </form>
  </ui-card>
</template>
