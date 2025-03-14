import { dbPromise } from './db'
import type { Practic } from './types'

const formatDecimal = (num: number) => String(num).replace('.', '_')

export const createPractic = async (
  data: Practic
): Promise<{ success: boolean; message?: string }> => {
  try {
    const practicesDb = (await dbPromise).practicesDb

    const id = `${data.year}-${String(data.month).padStart(2, '0')}-${String(data.day).padStart(2, '0')}-${formatDecimal(data.hour)}-${formatDecimal(data.duration)}`

    const existingPractic = await practicesDb.get(id)

    if (existingPractic) {
      return { success: false, message: 'The practice already exists' }
    }

    const newData = { id, ...data }

    practicesDb.set(id, newData)
    return { success: true }
  } catch (error) {
    return { success: false, message: error as string }
  }
}

export const getPractices = async (params?: {
  day?: number
  month?: number
  year?: number
}): Promise<(Practic & { id: string })[]> => {
  try {
    const practicesDb = (await dbPromise).practicesDb

    const allPractices: (Practic & { id: string })[] = practicesDb
      .getAll()
      .map((item) => item.value)

    return allPractices.filter((practic) => {
      return (
        (params?.year === undefined || practic.year === params.year) &&
        (params?.month === undefined || practic.month === params.month) &&
        (params?.day === undefined || practic.day === params.day)
      )
    })
  } catch (error) {
    console.error('Ошибка при получении практик:', error)
    return []
  }
}
