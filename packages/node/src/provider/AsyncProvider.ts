import { BaseProvider } from './BaseProvider.js'
import type { NodeAdapter } from '../types.js'

export class AsyncProvider<T> extends BaseProvider<T> {
  constructor(adapter: NodeAdapter<T>, initialData?: T) {
    super(adapter)
    this.initialData = initialData
  }
}
