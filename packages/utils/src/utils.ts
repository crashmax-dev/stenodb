import { plainToClass } from 'class-transformer'
import { getDiff } from 'json-difference'
import type { Data, DataTransformer, EntityTransformer } from './types.js'
import type { ClassConstructor } from 'class-transformer'
import type { Delta } from 'json-difference'

export function getDifferenceData<T>(
  currentData: T | null,
  newData: T | null
): Delta | null {
  if (!currentData || !newData) return null
  return getDiff(currentData, newData, true)
}

export function dataTransformer<T>(
  transformer: ReturnType<typeof entityTransformer<T>>
): DataTransformer<T> {
  return {
    toJSON: (data) =>
      transformer(typeof data === 'string' ? JSON.parse(`${data}`) : data),
    toString: (data) => JSON.stringify(data, null, 2)
  }
}

export function entityTransformer<T>(
  entity: ClassConstructor<T>
): EntityTransformer<T> {
  const transformer = (data: Data<T>) =>
    data ? plainToClass(entity, data) : null
  return transformer
}
