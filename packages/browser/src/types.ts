import type { LocalStorage } from './adapter/LocalStorage.js'
import type { SessionStorage } from './adapter/SessionStorage.js'
import type { StorageProvider } from './provider/StorageProvider.js'
import type { CreateLogger } from '@stenodb/logger'
import type { ClassConstructor } from 'class-transformer'

export namespace Steno {
  export type Entity<T> = ClassConstructor<T>
  export type BrowserAdapter<T> = LocalStorage<T> | SessionStorage<T>
  export type BrowserProvider<T> = StorageProvider<T>

  export interface BrowserProviderOptions {
    logger?: CreateLogger
  }
}
