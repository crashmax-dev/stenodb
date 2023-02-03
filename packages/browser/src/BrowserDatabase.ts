import { BrowserProvider } from './BrowserProvider.js'
import type { BrowserAdapter } from './types.js'

export class BrowserDatabase<T extends unknown> extends BrowserProvider<T> {
  constructor(adapter: BrowserAdapter<T>, initialData?: T) {
    super(adapter)
    this.initialData = initialData
  }
}
