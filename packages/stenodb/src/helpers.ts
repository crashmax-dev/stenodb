import { getDiff } from 'json-difference'

export function getDifferenceData<T>(currentData: T | null, newData: T | null) {
  if (!currentData || !newData) return null
  return getDiff(currentData, newData, true)
}

export function parseData<T>(data: any) {
  return {
    toJSON: () => JSON.parse(data.toString()) as T,
    toString: () => JSON.stringify(data, null, 2)
  }
}
