import './assets/main.css'

import { createApp } from 'vue'

import App from './app.vue'

import router from './plugins/router'

createApp(App).use(router).mount('#app')
