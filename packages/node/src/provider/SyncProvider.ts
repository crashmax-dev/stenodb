import { BaseProvider } from './BaseProvider.js'
import type { NodeAdapter } from '../types.js'

export class SyncProvider<T> extends BaseProvider<T> {
  constructor(adapter: NodeAdapter<T>, initialData?: T) {
    super(adapter)
    this.initialData = initialData
  }
}
