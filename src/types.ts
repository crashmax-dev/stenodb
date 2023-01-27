import type { LowDirectoryProvider } from './directory.js'
import type { LoggerProvider } from './logger.js'
import type { ClassConstructor } from 'class-transformer'
import type { JSONFile } from 'lowdb/node'

export interface LoggerOptions {
  enabled: boolean
}

export interface LowProviderOptions {
  path: string
  logger?: LoggerOptions
}

export interface LowDatabaseOptions<T extends unknown> {
  name: string
  logger: LoggerProvider
  adapter: JSONFile<T>
  directory: LowDirectoryProvider
  entity: LowEntity<T>
  initialData?: T
}

export interface LowDatabaseInstanceOptions<T>
  extends Pick<LowDatabaseOptions<T>, 'name' | 'initialData'> {
  entity: LowEntity<T>
}

export interface LowLoggerOptions {
  path: string
  options?: LoggerOptions
}

export type LowEntity<T = any> = ClassConstructor<T>
