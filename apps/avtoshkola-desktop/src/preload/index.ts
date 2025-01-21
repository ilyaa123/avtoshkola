import { contextBridge } from 'electron'

import { electronAPI } from '@electron-toolkit/preload'

// Импорт пользовательского модуля auth
import auth from './auth'

// Создание объекта `api`, который будет передаваться в рендер-процесс
const api = {
  auth
}

// Проверка, включена ли контекстная изоляция в приложении
if (process.contextIsolated) {
  try {
    // Использование contextBridge для безопасного экспонирования API в глобальном объекте window
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // Если контекстная изоляция отключена, напрямую добавляем свойства в объект window

  // @ts-ignore — отключение проверки типов, так как свойства добавляются динамически
  window.electron = electronAPI
  // @ts-ignore
  window.api = api
}
