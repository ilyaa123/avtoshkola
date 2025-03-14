import { ipcRenderer } from 'electron'
import { FSDB } from 'file-system-db'
import path from 'path'

const getAppDataPath = async (): Promise<string> => ipcRenderer.invoke('get-app-data-path')

const initDb = async () => {
  const appDataPath = await getAppDataPath()

  const practicesPath = path.join(appDataPath, 'data', 'practices.json')

  return {
    practicesDb: new FSDB(practicesPath, false)
  }
}

const dbPromise = initDb()

export { dbPromise }
