import type { AsyncWriter } from './adapter/AsyncWriter.js'
import type { SyncWriter } from './adapter/SyncWriter.js'
import type { AsyncProvider } from './provider/AsyncProvider.js'
import type { SyncProvider } from './provider/SyncProvider.js'
import type { ClassConstructor } from 'class-transformer'

export type Entity<T> = ClassConstructor<T>
export type NodeAdapter<T> = AsyncWriter<T> | SyncWriter<T>
export type NodeProvider<T> = AsyncProvider<T> | SyncProvider<T>
