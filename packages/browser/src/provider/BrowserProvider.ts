import { StorageProvider } from './StorageProvider.js'
import type { Steno } from '../types.js'

export class BrowserProvider {
  #options: Steno.BrowserProviderOptions

  constructor(options: Steno.BrowserProviderOptions = {}) {
    this.#options = options
  }

  private registerAdapterModules<T>(adapter: Steno.BrowserAdapter<T>) {
    if (!this.#options?.logger) return
    const logger = this.#options.logger(adapter.name)
    adapter.registerLogger(logger)
  }

  create<T>(adapter: Steno.BrowserAdapter<T>): StorageProvider<T> {
    this.registerAdapterModules(adapter)
    return new StorageProvider(adapter)
  }
}
