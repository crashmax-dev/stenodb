import { AsyncProvider } from './AsyncProvider.js'
import { DirectoryProvider } from './DirectoryProvider.js'
import { SyncProvider } from './SyncProvider.js'
import type { AsyncAdapter } from '../adapter/AsyncAdapter.js'
import type { SyncAdapter } from '../adapter/SyncAdapter.js'
import type { NodeAdapter, NodeProviderOptions } from '../types.js'

export class NodeProvider {
  #directory: DirectoryProvider
  #options: NodeProviderOptions

  constructor(options: NodeProviderOptions) {
    this.#options = options
    this.#directory = new DirectoryProvider(options.path)
  }

  private registerAdapterModules<T>(adapter: NodeAdapter<T>): void {
    adapter.registerDirectory(this.#directory)

    if (this.#options?.logger) {
      const logger = this.#options.logger(adapter.fileName)
      adapter.registerLogger(logger)
    }
  }

  async create<T>(adapter: AsyncAdapter<T>): Promise<AsyncProvider<T>> {
    await this.#directory.createDirectory().withAsync()
    this.registerAdapterModules(adapter)
    return new AsyncProvider(adapter)
  }

  createSync<T>(adapter: SyncAdapter<T>): SyncProvider<T> {
    this.#directory.createDirectory().withSync()
    this.registerAdapterModules(adapter)
    return new SyncProvider(adapter)
  }
}
