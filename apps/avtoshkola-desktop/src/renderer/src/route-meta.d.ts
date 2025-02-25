import 'vue-router'

export {}

export interface MiddlewareContext {
  to: import('vue-router').RouteLocationNormalized

  from: import('vue-router').RouteLocationNormalized

  next: import('vue-router').NavigationGuardNext

  router: import('vue-router').Router
}

export type Middleware = (context: MiddlewareContext) => void

declare module 'vue-router' {
  interface RouteMeta {
    isAuth?: boolean
    middleware?: Middleware[]
    title?: string
  }
}
