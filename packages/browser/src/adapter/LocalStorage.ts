import { BrowserStorage } from './WebStorage.js'
import type { Entity } from '../types.js'

export class LocalStorage<T> extends BrowserStorage<T> {
  constructor(name: string, entity: Entity<T>) {
    super(name, localStorage, entity)
  }
}
