import { StenoWriter, StenoWriterSync } from './core.js'
import type { DirectoryProvider } from './directory.js'
import type { LoggerProvider } from './logger.js'
import type { ClassConstructor } from 'class-transformer'

export declare namespace Steno {
  export interface SyncAdapterOptions<T> {
    name: string
    entity: Entity<T> | undefined
    logger: LoggerProvider
    directory: DirectoryProvider
    writer: StenoWriterSync<T>
  }

  export interface AsyncAdapterOptions<T>
    extends Omit<SyncAdapterOptions<T>, 'writer'> {
    writer: StenoWriter<T>
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

  export interface SyncWriter<T> {
    read(): T | null
    write(data: T): void
    reset(initialData: T): void
    exists(): boolean
  }

  export interface AsyncWriter<T> {
    read(): Promise<T | null>
    write(data: T): Promise<void>
    reset(initialData: T): Promise<void>
    exists(): Promise<boolean>
  }

  export type Entity<T = any> = ClassConstructor<T>
}
