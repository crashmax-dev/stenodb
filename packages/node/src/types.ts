import type { AsyncAdapter } from './adapter/AsyncAdapter.js'
import type { SyncAdapter } from './adapter/SyncAdapter.js'
import type { CreateLogger } from '@stenodb/logger'

export type NodeAdapter<T> = AsyncAdapter<T> | SyncAdapter<T>

export interface NodeProviderOptions {
  path: string
  logger?: CreateLogger
}
