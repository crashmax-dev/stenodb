import type { LocalStorage } from './adapter/LocalStorage.js'
import type { SessionStorage } from './adapter/SessionStorage.js'
import type { StorageProvider } from './provider/StorageProvider.js'
import type { CreateLogger } from '@stenodb/logger'
import type { ClassEntity } from '@stenodb/utils'

export namespace Steno {
  export type Entity<T> = ClassEntity<T>
  export type BrowserAdapter<T> = LocalStorage<T> | SessionStorage<T>
  export type BrowserProvider<T> = StorageProvider<T>

  export interface BrowserProviderOptions {
    logger?: CreateLogger
  }
}
