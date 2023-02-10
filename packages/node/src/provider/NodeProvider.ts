import { AsyncAdapter } from '../adapter/AsyncAdapter.js'
import { SyncAdapter } from '../adapter/SyncAdapter.js'
import { AsyncProvider } from './AsyncProvider.js'
import { DirectoryProvider } from './DirectoryProvider.js'
import { SyncProvider } from './SyncProvider.js'
import type { Steno } from '../types.js'

export class NodeProvider {
  #directory: DirectoryProvider
  #options: Steno.NodeProviderOptions

  constructor(options: Steno.NodeProviderOptions) {
    this.#options = options
    this.#directory = new DirectoryProvider(options.path)
  }

  private async registerAdapterModules<T>(
    adapter: Steno.NodeAdapter<T>
  ): Promise<void> {
    await this.#directory.createDatabaseDir()
    adapter.registerDirectory(this.#directory)

    if (this.#options?.logger) {
      const logger = this.#options.logger(adapter.fileName)
      adapter.registerLogger(logger)
    }
  }

  async create<T>(
    adapter: Steno.NodeAdapter<T>
  ): Promise<Steno.NodeProvider<T>> {
    await this.registerAdapterModules(adapter)

    if (adapter instanceof AsyncAdapter) {
      return new AsyncProvider(adapter)
    } else if (adapter instanceof SyncAdapter) {
      return new SyncProvider(adapter)
    }

    throw new Error('Invalid adapter')
  }
}
