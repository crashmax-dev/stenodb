import { getDiff } from 'json-difference'
import type { Delta } from 'json-difference/dist/models/jsondiffer.model.js'

export function nanoid(): string {
  return Math.random().toString(36).slice(2)
}

export function getDifferenceData<T extends unknown>(
  currentData: T | null,
  newData: T | null
): Delta | null {
  if (!currentData || !newData) return null
  const differenceData = getDiff(currentData, newData, true)
  return differenceData
}

export function parseData<T>(data: any) {
  return {
    toJSON: () => JSON.parse(data.toString()) as T,
    toString: () => JSON.stringify(data, null, 2)
  }
}
