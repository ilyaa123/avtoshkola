import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

import vue from '@vitejs/plugin-vue'

import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },

  preload: {
    plugins: [externalizeDepsPlugin()]
  },

  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },

    plugins: [
      vue(),
      viteStaticCopy({
        targets: [
          {
            src: resolve(__dirname, '../../node_modules/avtoshkola-pdd/dist/images/**/*'),
            dest: 'pdd'
          }
        ]
      })
    ]
  }
})
