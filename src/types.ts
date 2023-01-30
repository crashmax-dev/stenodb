import type { DirectoryProvider } from './providers/directory.js'
import type { LoggerProvider } from './providers/logger.js'
import type { ClassConstructor } from 'class-transformer'
import type { Low, LowSync } from 'lowdb'

export declare namespace Lowdb {
  export interface AdapterOptions<T> {
    name: string
    entity: Entity<T> | undefined
    logger: LoggerProvider
    directory: DirectoryProvider
  }

  export interface DatabaseProviderOptions {
    path: string
    logger?: LoggerProviderOptions
  }

  export interface DatabaseOptions<T> {
    name: string
    entity: Entity<T>
    initialData?: T
  }

  export interface LoggerProviderOptions {
    enabled: boolean
  }

  export interface SyncAdapter<T> {
    read(): T
    write(): void
    reset(): void
    exists(): boolean
  }

  export interface AsyncAdapter<T> {
    read(): Promise<T>
    write(): Promise<void>
    reset(): Promise<void>
    exists(): Promise<boolean>
  }

  export type Entity<T = any> = ClassConstructor<T>
  export type Adapter<T> = Low<T> | LowSync<T>
}
