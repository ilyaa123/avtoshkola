import { ElectronAPI } from '@electron-toolkit/preload'

// Импорт модулей
import auth from './auth'

// Расширение глобального пространства имен TypeScript
declare global {
  // Расширение интерфейса Window
  interface Window {
    // Добавление свойства electron, тип которого — ElectronAPI
    // Это предоставляет доступ к Electron API (например, ipcRenderer) в глобальном объекте window
    electron: ElectronAPI

    // Добавление свойства api, содержащего объект с модулем auth
    api: {
      auth: typeof auth
    }
  }
}
