import { StorageProvider } from './StorageProvider.js'
import type { Steno } from '../types.js'

export class BrowserProvider {
  create<T>(adapter: Steno.BrowserAdapter<T>): StorageProvider<T> {
    return new StorageProvider(adapter)
  }
}
