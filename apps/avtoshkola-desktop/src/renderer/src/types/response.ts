export type Response<T extends Record<string, unknown>> = {
  data: T
}

export type ResponseError = {
  error: {
    key: string
    message: string
  }
}
