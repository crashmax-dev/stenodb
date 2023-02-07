import { AsyncAdapter } from '../adapter/AsyncAdapter.js'
import { SyncAdapter } from '../adapter/SyncAdapter.js'
import { AsyncProvider } from './AsyncProvider.js'
import { DirectoryProvider } from './DirectoryProvider.js'
import { SyncProvider } from './SyncProvider.js'
import type { Steno } from '../types.js'

export class NodeProvider {
  #directory: DirectoryProvider

  constructor(path: string) {
    this.#directory = new DirectoryProvider(path)
  }

  private registerDirectory<T>(adapter: Steno.NodeAdapter<T>) {
    adapter.registerDirectory(this.#directory)
  }

  create<T>(adapter: SyncAdapter<T>): SyncProvider<T>
  create<T>(adapter: AsyncAdapter<T>): AsyncProvider<T>
  create<T>(adapter: Steno.NodeAdapter<T>): Steno.NodeProvider<T> {
    if (adapter instanceof SyncAdapter) {
      return this.createSync(adapter)
    }

    if (adapter instanceof AsyncAdapter) {
      return this.createAsync(adapter)
    }

    throw new Error('Invalid adapter')
  }

  createSync<T>(adapter: SyncAdapter<T>): SyncProvider<T> {
    this.registerDirectory(adapter)
    return new SyncProvider(adapter)
  }

  createAsync<T>(adapter: AsyncAdapter<T>): AsyncProvider<T> {
    this.registerDirectory(adapter)
    return new AsyncProvider(adapter)
  }
}
