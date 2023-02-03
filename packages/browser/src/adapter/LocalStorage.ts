import { Entity } from '../types.js'
import { BrowserStorage } from './WebStorage.js'

export class LocalStorage<T> extends BrowserStorage<T> {
  constructor(name: string, entity: Entity<T>) {
    super(name, localStorage, entity)
  }
}
