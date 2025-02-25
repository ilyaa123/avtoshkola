const deepCloneObject = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj

  const clone: Record<string, unknown> = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepCloneObject(obj[key] as any)
    }
  }
  return clone as T
}

const deepClone = <T>(arr: T[]): T[] => {
  if (!arr) return arr

  return arr.map((item) => {
    if (item && typeof item === 'object') {
      return deepCloneObject(item)
    }
    return item
  })
}

export default deepClone
