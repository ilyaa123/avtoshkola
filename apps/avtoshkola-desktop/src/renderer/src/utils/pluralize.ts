export const pluralize = (count: number, one: string, few: string, many: string) => {
  if (count % 10 === 1 && count % 100 !== 11) return one
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) return few
  return many
}
