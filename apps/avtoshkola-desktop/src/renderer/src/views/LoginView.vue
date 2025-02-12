<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import UiCard from '@renderer/ui/UiCard.vue'
import UiTextField from '@renderer/ui/UiTextField.vue'
import UiButton from '@renderer/ui/UiButton.vue'

import { useAuth } from '@renderer/store/auth'
import { ResponseError } from '@renderer/types/response'

const authApi = window.api?.auth

const router = useRouter()

const { setUser } = useAuth()

const form = reactive({
  login: '',
  password: ''
})

const errors = reactive({
  login: '',
  password: ''
})

const handleOnLogin = () => {
  authApi
    .login({
      login: form.login,
      password: form.password
    })
    .then((res) => {
      setUser(res.data)
      router.push('/')
    })
    .catch((err) => {
      const error: ResponseError | Error = err
      if ('error' in error) {
        if (error.error.key == 'login') {
          errors[error.error.key] = error.error.message
        }
        if (error.error.key == 'password') {
          errors[error.error.key] = error.error.message
        }
      }
    })
}
</script>

<template>
  <ui-card style="max-width: 400px; width: 100%">
    <h1 class="text-2xl text-center mb-8">Вход</h1>
    <form @submit.prevent="handleOnLogin">
      <ui-text-field
        v-model="form.login"
        v-model:error="errors.login"
        class="mb-5"
        placeholder="Логин"
      />
      <ui-text-field
        v-model="form.password"
        v-model:error="errors.password"
        class="mb-5"
        placeholder="Пароль"
        type="password"
      />
      <ui-button type="submit" block>Войти</ui-button>
    </form>
  </ui-card>
</template>
