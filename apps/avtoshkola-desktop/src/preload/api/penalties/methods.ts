import type { Penalty } from './types'

import { dbPromise } from './db'

export const getAllPenalties = async (): Promise<Penalty[]> => {
  const penaltiesDb = (await dbPromise).penaltiesDb

  return penaltiesDb.getAll().map((item) => item.value)
}
