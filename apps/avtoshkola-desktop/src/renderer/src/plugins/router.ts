// Импорт middleware для аутентификации
import authMiddleware from '@renderer/middlewares/auth'

import { createMemoryHistory, createRouter } from 'vue-router'

import type { NavigationGuardNext } from 'vue-router'
import type { Middleware, MiddlewareContext } from '@renderer/route-meta'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@renderer/layouts/HomeLayout.vue'),
      meta: { isAuth: true, middleware: [authMiddleware] },
      children: [
        {
          path: '',
          component: () => import('@renderer/pages/index.vue')
        },
        {
          path: 'teory',
          children: [
            {
              path: '',
              component: () => import('@renderer/pages/teory/index.vue')
            },
            {
              path: 'penalties',
              component: () => import('@renderer/pages/teory/penalties.vue')
            },
            {
              path: 'questions',
              component: () => import('@renderer/pages/teory/questions.vue')
            },
            {
              path: 'signs',
              component: () => import('@renderer/pages/teory/signs.vue')
            }
          ]
        },
        {
          path: 'practic',
          component: () => import('@renderer/pages/practic.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@renderer/pages/login.vue')
    }
  ]
})

const nextFactory = (
  context: MiddlewareContext,
  middleware: Middleware[],
  index: number
): NavigationGuardNext => {
  const subsequentMiddleware = middleware[index]

  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    if (parameters.length > 0) {
      return context.next(...(parameters as []))
    }

    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

    const context: MiddlewareContext = { from, next, router, to }

    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})

export default router
