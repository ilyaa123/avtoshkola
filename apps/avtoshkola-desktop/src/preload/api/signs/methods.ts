import type { SignTypes, Sign } from './types'

import { dbPromise } from '../../db'

export const getSygnTypes = async (): Promise<SignTypes> => {
  const signsDb = (await dbPromise).signsDb

  return signsDb.getAll().map((item) => item.key)
}

export const getSigns = async (type: string): Promise<Sign[]> => {
  const signsDb = (await dbPromise).signsDb
  return signsDb.get(type)
}

export const getSign = async (type: string, number: string): Promise<Sign | undefined> => {
  const signsDb = (await dbPromise).signsDb
  const typeData = signsDb.get(type)
  return typeData ? typeData[number] : undefined
}
