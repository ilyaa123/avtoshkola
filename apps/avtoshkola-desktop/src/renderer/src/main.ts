// Импорт основного CSS файла для приложения
import './assets/main.css'

// createApp используется для создания нового экземпляра Vue-приложения
import { createApp } from 'vue'

// App.vue является корневым компонентом, с которого начинается построение приложения
import App from './app.vue'

// router определяет маршруты (пути) для навигации в приложении
import router from './plugins/router'

createApp(App) // Создает приложение с корневым компонентом App.vue
  .use(router) // Подключает маршрутизатор к приложению
  .mount('#app') // Монтирует приложение в HTML-элемент с ID 'app'
