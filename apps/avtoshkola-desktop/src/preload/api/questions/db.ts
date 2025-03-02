import { ipcRenderer } from 'electron'
import { FSDB } from 'file-system-db'
import path from 'path'
import fs from 'fs'

const findPddPath = () => {
  if (process.env.NODE_ENV === 'development') {
    const possiblePaths = require.resolve.paths('avtoshkola-pdd') || []
    for (const basePath of possiblePaths) {
      const candidatePath = path.join(basePath, 'avtoshkola-pdd/dist/data')
      if (fs.existsSync(candidatePath)) {
        return candidatePath
      }
    }
    throw new Error('❌ avtoshkola-pdd не найден в node_modules!')
  } else {
    return path.join(
      process.resourcesPath,
      'app.asar.unpacked/node_modules/avtoshkola-pdd/dist/data'
    )
  }
}

const getAppDataPath = async (): Promise<string> => ipcRenderer.invoke('get-app-data-path')

const initDb = async () => {
  const appDataPath = await getAppDataPath()

  const pddBasePath = findPddPath()

  const ticketsABDbPath = path.join(pddBasePath, 'questions/A_B/tickets.json')
  const ticketsCDDbPath = path.join(pddBasePath, 'questions/C_D/tickets.json')
  const topicsABDbPath = path.join(pddBasePath, 'questions/A_B/topics.json')
  const topicsCDDbPath = path.join(pddBasePath, 'questions/C_D/topics.json')

  const ticketAnswersPath = path.join(appDataPath, 'data', 'ticket_answers.json')
  const topicAnswersPath = path.join(appDataPath, 'data', 'topic_answers.json')

  return {
    tickets_db_AB: new FSDB(ticketsABDbPath, false),
    tickets_db_CD: new FSDB(ticketsCDDbPath, false),
    topics_db_AB: new FSDB(topicsABDbPath, false),
    topics_db_CD: new FSDB(topicsCDDbPath, false),
    ticketAnswersDb: new FSDB(ticketAnswersPath, false),
    topicAnswersDb: new FSDB(topicAnswersPath, false)
  }
}

const dbPromise = initDb()

export { dbPromise }
