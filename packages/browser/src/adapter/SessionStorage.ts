import { BrowserStorage } from './WebStorage.js'
import type { ClassEntity } from '@stenodb/utils'

export class SessionStorage<T> extends BrowserStorage<T> {
  constructor(name: string, entity: ClassEntity<T>, initialData?: T) {
    super(name, sessionStorage, entity, initialData)
  }
}
