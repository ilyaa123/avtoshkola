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

const initDb = async () => {
  const pddBasePath = findPddPath()
  const signsDbPath = path.join(pddBasePath, 'signs/signs.json')

  return {
    signsDb: new FSDB(signsDbPath, false)
  }
}

const dbPromise = initDb()

export { dbPromise }
