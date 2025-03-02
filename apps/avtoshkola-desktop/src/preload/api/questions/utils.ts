import { FSDB } from 'file-system-db'
import { TicketCategory } from './types'
import { dbPromise } from './db'

type FSDBMethodsOnly = {
  [K in keyof FSDB]: FSDB[K] extends (...args: any[]) => any ? K : never
}[keyof FSDB]

type FSDBMethod<T extends FSDBMethodsOnly> = T extends keyof FSDB
  ? FSDB[T] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never
  : never

const getTicketsDb = async (): Promise<
  Record<
    TicketCategory,
    <T extends FSDBMethodsOnly>(
      method: T,
      ...args: Parameters<FSDBMethod<T>>
    ) => ReturnType<FSDBMethod<T>>
  >
> => {
  const db = await dbPromise

  return {
    A_B: (method, ...args) => (db.tickets_db_AB[method] as any)(...args),
    C_D: (method, ...args) => (db.tickets_db_CD[method] as any)(...args)
  }
}

const getTopicsDb = async (): Promise<
  Record<
    TicketCategory,
    <T extends FSDBMethodsOnly>(
      method: T,
      ...args: Parameters<FSDBMethod<T>>
    ) => ReturnType<FSDBMethod<T>>
  >
> => {
  const db = await dbPromise

  return {
    A_B: (method, ...args) => (db.topics_db_AB[method] as any)(...args),
    C_D: (method, ...args) => (db.topics_db_CD[method] as any)(...args)
  }
}

// 📌 Экспортируем асинхронные функции
export { getTicketsDb, getTopicsDb }
