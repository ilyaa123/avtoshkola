import 'vue-router'

export {}

// Этот интерфейс описывает контекст, который будет передаваться в функции middleware
export interface MiddlewareContext {
  // Объект `to` — целевой маршрут, к которому направляется пользователь
  to: import('vue-router').RouteLocationNormalized

  // Объект `from` — маршрут, с которого пользователь переходит
  from: import('vue-router').RouteLocationNormalized

  // Функция `next` — используется для перехода к следующему шагу в навигации
  next: import('vue-router').NavigationGuardNext

  // Экземпляр маршрутизатора Vue
  router: import('vue-router').Router
}

// Middleware — это функция, которая принимает MiddlewareContext и ничего не возвращает
export type Middleware = (context: MiddlewareContext) => void

// Расширение модуля vue-router
declare module 'vue-router' {
  // RouteMeta — объект, который можно использовать для хранения пользовательских данных маршрута
  interface RouteMeta {
    // Поле `isAuth` — флаг, указывающий, требует ли маршрут аутентификации
    isAuth?: boolean

    // Поле `middleware` — массив функций Middleware, которые будут выполняться перед переходом на маршрут
    middleware: Middleware[]
  }
}
