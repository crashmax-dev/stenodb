import { BrowserDatabase } from './database.js'
import type { Steno } from '../types.js'

export class BrowserProvider<T extends unknown> extends BrowserDatabase<T> {
  constructor({
    adapter,
    entity,
    initialData
  }: Omit<Steno.BrowserDatabaseOptions<T>, 'name'>) {
    super(adapter, entity)

    if (initialData) {
      this.initialData = initialData
    }

    this.read()
  }
}
