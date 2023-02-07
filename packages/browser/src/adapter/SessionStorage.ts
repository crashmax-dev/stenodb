import { BrowserStorage } from './WebStorage.js'
import type { Steno } from '../types.js'

export class SessionStorage<T> extends BrowserStorage<T> {
  constructor(name: string, entity: Steno.Entity<T>, initialData?: T) {
    super(name, sessionStorage, entity, initialData)
  }
}
