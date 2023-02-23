import { StorageProvider } from './StorageProvider.js'
import type { BrowserProviderOptions, BrowserStorageAdapter } from '../types.js'

export class BrowserProvider {
  #options: BrowserProviderOptions

  constructor(options: BrowserProviderOptions = {}) {
    this.#options = options
  }

  private registerAdapterModules<T>(adapter: BrowserStorageAdapter<T>): void {
    if (!this.#options?.logger) return
    const logger = this.#options.logger(adapter.name)
    adapter.registerLogger(logger)
  }

  create<T>(adapter: BrowserStorageAdapter<T>): StorageProvider<T> {
    this.registerAdapterModules(adapter)
    return new StorageProvider(adapter)
  }
}
