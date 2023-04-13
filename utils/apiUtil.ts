type KeyParams = {
  [key: string]: any
}
export function getQueryKey<T extends KeyParams>(key: string, params?: T) {
  return [key, ...(params ? [params] : [])]
}
