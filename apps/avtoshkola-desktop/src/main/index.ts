import { app, shell, BrowserWindow } from 'electron'
import { join } from 'path'

import { electronApp, optimizer, is } from '@electron-toolkit/utils'

import icon from '../../resources/icon.png?asset'

// Функция для создания окна приложения
function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // Событие: когда окно готово к показу
  mainWindow.on('ready-to-show', () => {
    mainWindow.show() // Отображение окна

    if (is.dev) {
      mainWindow.webContents.openDevTools() // Открытие инструментов разработчика в режиме разработки
    }
  })

  // Обработка открытия новых окон из WebContents
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' } // Запрещает открытие новых окон в приложении
  })

  // Загрузка содержимого окна
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    // В режиме разработки загружается URL с локального сервера разработки
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    // В продакшн-сборке загружается файл HTML из папки сборки
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// Основной процесс: запуск приложения
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow() // Создает основное окно приложения

  // Событие активации приложения (например, при нажатии на иконку в Dock на macOS)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Событие: все окна приложения закрыты
app.on('window-all-closed', () => {
  // Для macOS приложение не завершает работу при закрытии всех окон
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
