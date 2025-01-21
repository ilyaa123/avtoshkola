import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

// Плагин Vite для работы с Vue.js. Он позволяет компилировать Vue-компоненты.
import vue from '@vitejs/plugin-vue'

// Экспорт конфигурации для Electron Vite
export default defineConfig({
  // Конфигурация для главного процесса Electron (main)
  main: {
    plugins: [externalizeDepsPlugin()]
  },

  // Конфигурация для процесса preload (скрипт, который работает между главным процессом и renderer)
  preload: {
    plugins: [externalizeDepsPlugin()]
  },

  // Конфигурация для рендер-процесса Electron (renderer)
  renderer: {
    resolve: {
      alias: {
        // Настраивает псевдоним для импорта файлов. Вместо длинных путей можно использовать '@renderer'
        '@renderer': resolve('src/renderer/src')
      }
    },

    // Добавляет поддержку Vue.js для рендер-процесса, чтобы можно было писать Vue-компоненты.
    plugins: [vue()]
  }
})
