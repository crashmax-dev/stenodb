import { AsyncWriter } from './adapter/AsyncWriter.js'
import { SyncWriter } from './adapter/SyncWriter.js'
import { AsyncProvider } from './provider/AsyncProvider.js'
import { SyncProvider } from './provider/SyncProvider.js'
import type { NodeAdapter } from './types.js'

export class NodeDatabase<T> {
  constructor(adapter: NodeAdapter<T>, initialData?: T) {
    if (adapter instanceof SyncWriter) {
      return new SyncProvider(adapter, initialData)
    } else if (adapter instanceof AsyncWriter) {
      return new AsyncProvider(adapter, initialData)
    }
  }
}
