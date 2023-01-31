import type { LocalStorage, SessionStorage } from './browser/adapter.js'
import type { DirectoryProvider } from './directory.js'
import type { LoggerProvider } from './logger.js'
import type { AsyncWriter, SyncWriter } from './node/adapter.js'
import type { ClassConstructor } from 'class-transformer'

export declare namespace Steno {
  export interface NodeAdapterOptions<T> {
    name: string
    entity: Entity<T> | undefined
    logger: LoggerProvider
    directory: DirectoryProvider
    // adapter: NodeAdapter<T>
    adapter: SyncWriter<T>
  }

  export interface DatabaseProviderOptions {
    path: string
    logger?: LoggerProviderOptions
  }

  export interface DatabaseOptions<T> {
    name: string
    entity: Entity<T>
    // adapter: NodeAdapter<T>
    initialData?: T | null
  }

  export interface BrowserDatabaseOptions<T> extends DatabaseOptions<T> {
    adapter: BrowserAdapter<T>
  }

  export interface LoggerProviderOptions {
    enabled: boolean
  }

  export interface SyncAdapter<T> {
    read(): T | null
    write(data: T | null): void
    reset(initialData: T): void
    exists(): boolean
  }

  export interface AsyncAdapter<T> {
    read(): Promise<T | null>
    write(data: T | null): Promise<void>
    reset(initialData: T): Promise<void>
    exists(): Promise<boolean>
  }

  export type Entity<T = any> = ClassConstructor<T>
  export type NodeAdapter<T> = SyncWriter<T> | AsyncWriter<T>
  export type BrowserAdapter<T> = LocalStorage<T> | SessionStorage<T>
}
