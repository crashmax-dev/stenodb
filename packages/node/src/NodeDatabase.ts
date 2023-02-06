import { AsyncWriter } from './adapter/AsyncWriter.js'
import { SyncWriter } from './adapter/SyncWriter.js'
import { DirectoryProvider } from './DirectoryProvider.js'
import { AsyncProvider } from './provider/AsyncProvider.js'
import { SyncProvider } from './provider/SyncProvider.js'
import type { NodeAdapter, NodeProvider } from './types.js'

export class NodeDatabase {
  #directory: DirectoryProvider

  constructor(path: string) {
    this.#directory = new DirectoryProvider(path)
  }

  create<T>(adapter: SyncWriter<T>, initialData?: T): SyncProvider<T>
  create<T>(adapter: AsyncWriter<T>, initialData?: T): AsyncProvider<T>
  create<T>(adapter: NodeAdapter<T>, initialData?: T): NodeProvider<T> {
    adapter.setDirectory(this.#directory)

    if (adapter instanceof SyncWriter) {
      return new SyncProvider(adapter, initialData)
    }

    if (adapter instanceof AsyncWriter) {
      return new AsyncProvider(adapter, initialData)
    }

    throw new Error('Invalid adapter')
  }
}
