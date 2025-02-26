import { contextBridge } from 'electron'

import { electronAPI } from '@electron-toolkit/preload'

import auth from './api/auth'
import questions from './api/questions'
import penalties from './api/penalties'
import signs from './api/signs'

const api = {
  auth,
  questions,
  penalties,
  signs
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore Property 'electron' does not exist on type 'Window & typeof globalThis'
  window.electron = electronAPI

  // @ts-ignore Property 'api' does not exist on type 'Window & typeof globalThis'
  window.api = api
}
