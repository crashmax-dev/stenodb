import { AsyncAdapter } from '../adapter/AsyncAdapter.js'
import { SyncAdapter } from '../adapter/SyncAdapter.js'
import { AsyncProvider } from './AsyncProvider.js'
import { DirectoryProvider } from './DirectoryProvider.js'
import { SyncProvider } from './SyncProvider.js'
import type { Steno } from '../types.js'

export class NodeProvider {
  #directory: DirectoryProvider
  #options: Steno.NodeProviderOptions | undefined

  constructor(path: string, options?: Steno.NodeProviderOptions) {
    this.#directory = new DirectoryProvider(path)
    this.#options = options
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

  async create<T>(adapter: SyncAdapter<T>): Promise<SyncProvider<T>> {
    await this.registerAdapterModules(adapter)
    return new SyncProvider(adapter)
  }

  async createAsync<T>(adapter: AsyncAdapter<T>): Promise<AsyncProvider<T>> {
    await this.registerAdapterModules(adapter)
    return new AsyncProvider(adapter)
  }
}
