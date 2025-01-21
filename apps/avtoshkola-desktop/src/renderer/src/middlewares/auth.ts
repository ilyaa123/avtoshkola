import { useAuth } from '@renderer/store/auth'

import type { MiddlewareContext } from '@renderer/route-meta'

export default function authMiddleware({ to, next }: MiddlewareContext) {
  const { isAuth } = useAuth()

  if (to.meta.isAuth && !isAuth.value) {
    return next('/login')
  }

  return next()
}
