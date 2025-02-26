import { ElectronAPI } from '@electron-toolkit/preload'

import auth from './api/auth'
import questions from './api/questions'
import penalties from './api/penalties'
import signs from './api/signs'

declare global {
  interface Window {
    electron: ElectronAPI

    api: {
      auth: typeof auth
      questions: typeof questions
      penalties: typeof penalties
      signs: typeof signs
    }
  }
}
