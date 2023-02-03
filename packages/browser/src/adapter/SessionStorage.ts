import { Entity } from '../types.js'
import { BrowserStorage } from './WebStorage.js'

export class SessionStorage<T> extends BrowserStorage<T> {
  constructor(name: string, entity: Entity<T>) {
    super(name, sessionStorage, entity)
  }
}
