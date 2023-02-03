import { BrowserProvider } from './BrowserProvider.js'
import type { BrowserDatabaseOptions } from './types.js'

export class BrowserDatabase<T extends unknown> extends BrowserProvider<T> {
  constructor({ adapter, initialData }: BrowserDatabaseOptions<T>) {
    super(adapter)
    this.setInitialData(initialData)
  }
}
