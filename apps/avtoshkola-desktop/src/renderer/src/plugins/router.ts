// Импорт middleware для аутентификации
import authMiddleware from '@renderer/middlewares/auth'

import { createMemoryHistory, createRouter } from 'vue-router'

import type { NavigationGuardNext } from 'vue-router'
import type { Middleware, MiddlewareContext } from '@renderer/route-meta'

const router = createRouter({
  history: createMemoryHistory(), // Используется память для хранения истории (подходит для Electron и тестов)
  routes: [
    {
      path: '/', // Корневой маршрут
      component: () => import('@renderer/layouts/HomeLayout.vue'), // Главный layout
      meta: { isAuth: true, middleware: [authMiddleware] }, // Метаданные маршрута, включая middleware
      children: [
        {
          path: '', // Главная страница
          component: () => import('@renderer/pages/index.vue')
        },
        {
          path: 'teory', // Подстраница "теория"
          component: () => import('@renderer/pages/teory.vue')
        },
        {
          path: 'practic', // Подстраница "практика"
          component: () => import('@renderer/pages/practic.vue')
        }
      ]
    },
    {
      path: '/login', // Маршрут для страницы входа
      component: () => import('@renderer/pages/login.vue')
    }
  ]
})

// Фабрика функций для обработки middleware
const nextFactory = (
  context: MiddlewareContext,
  middleware: Middleware[],
  index: number
): NavigationGuardNext => {
  const subsequentMiddleware = middleware[index] // Выбираем следующее middleware

  if (!subsequentMiddleware) return context.next // Если middleware закончились, переходим дальше

  return (...parameters) => {
    if (parameters.length > 0) {
      // Если переданы параметры (например, перенаправление), вызываем next с ними
      return context.next(...(parameters as []))
    }

    // Рекурсивно создаем следующий middleware
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware }) // Выполняем текущее middleware
  }
}

// Устанавливаем глобальный middleware для маршрутов
router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    // Проверяем, есть ли middleware в метаданных маршрута
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

    // Создаем контекст маршрута
    const context: MiddlewareContext = { from, next, router, to }

    // Создаем цепочку middleware с помощью nextFactory
    const nextMiddleware = nextFactory(context, middleware, 1)

    // Выполняем первое middleware
    return middleware[0]({ ...context, next: nextMiddleware })
  }

  // Если middleware нет, переходим дальше
  return next()
})

export default router
