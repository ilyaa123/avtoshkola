import { FSDB } from "file-system-db";

import { TicketCategory } from "./types";

import { tickets_db_AB, tickets_db_CD, topics_db_AB, topics_db_CD } from "./db";

type FSDBMethodsOnly = {
  [K in keyof FSDB]: FSDB[K] extends (...args: any[]) => any ? K : never;
}[keyof FSDB];

type FSDBMethod<T extends FSDBMethodsOnly> = T extends keyof FSDB
  ? FSDB[T] extends (...args: infer P) => infer R
    ? (...args: P) => R
    : never
  : never;

export const ticketsDb: Record<
  TicketCategory,
  <T extends FSDBMethodsOnly>(
    method: T,
    ...args: Parameters<FSDBMethod<T>>
  ) => ReturnType<FSDBMethod<T>>
> = {
  A_B: (method, ...args) => (tickets_db_AB[method] as any)(...args),
  C_D: (method, ...args) => (tickets_db_CD[method] as any)(...args),
};

export const topicsDb: Record<
  TicketCategory,
  <T extends FSDBMethodsOnly>(
    method: T,
    ...args: Parameters<FSDBMethod<T>>
  ) => ReturnType<FSDBMethod<T>>
> = {
  A_B: (method, ...args) => (topics_db_AB[method] as any)(...args),
  C_D: (method, ...args) => (topics_db_CD[method] as any)(...args),
};
