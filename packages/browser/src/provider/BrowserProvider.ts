import { StorageProvider } from './StorageProvider.js'
import type { Steno } from '../types.js'
import type { CreateLogger } from '@stenodb/logger'

export class BrowserProvider {
  #options: Steno.BrowserProviderOptions
  #logger: CreateLogger

  constructor(options: Steno.BrowserProviderOptions) {
    this.#options = options
    this.#logger = options.logger
  }

  private registerAdapterModules<T>(adapter: Steno.BrowserAdapter<T>) {
    if (!this.#logger) return
    const logger = this.#logger(adapter.name)
    adapter.registerLogger(logger)
  }

  create<T>(adapter: Steno.BrowserAdapter<T>): StorageProvider<T> {
    this.registerAdapterModules(adapter)
    return new StorageProvider(adapter)
  }
}
