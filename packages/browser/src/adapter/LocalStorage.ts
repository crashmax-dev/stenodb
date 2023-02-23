import { BrowserStorage } from './WebStorage.js'
import type { ClassEntity } from '@stenodb/utils'

export class LocalStorage<T> extends BrowserStorage<T> {
  constructor(name: string, entity: ClassEntity<T>, initialData?: T) {
    super(name, localStorage, entity, initialData)
  }
}
