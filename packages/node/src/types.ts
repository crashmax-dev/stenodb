import type { AsyncAdapter } from './adapter/AsyncAdapter.js'
import type { SyncAdapter } from './adapter/SyncAdapter.js'
import type { AsyncProvider } from './provider/AsyncProvider.js'
import type { SyncProvider } from './provider/SyncProvider.js'
import type { CreateLogger } from '@stenodb/logger'
import type { ClassEntity } from '@stenodb/utils'

export namespace Steno {
  export type Entity<T> = ClassEntity<T>
  export type NodeAdapter<T> = AsyncAdapter<T> | SyncAdapter<T>
  export type NodeProvider<T> = AsyncProvider<T> | SyncProvider<T>

  export interface NodeProviderOptions {
    path: string
    logger?: CreateLogger
  }
}
