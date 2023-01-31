import { BrowserDatabase } from './database.js'
import type { Steno } from '../types.js'

export class BrowserProvider<T extends unknown> extends BrowserDatabase<T> {
  constructor({
    adapter,
    entity,
    initialData = null
  }: Omit<Steno.BrowserDatabaseOptions<T>, 'name'>) {
    super(adapter, entity)
    this.initialData ||= initialData
    this.read()
  }
}
