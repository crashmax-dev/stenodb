import type { LowDirectoryProvider } from './directory.js'
import type { LoggerProvider } from './logger.js'
import type { JSONFile } from 'lowdb/node'
import { LowBaseEntity } from './entities.js'

export interface LoggerOptions {
  enabled: boolean
}

export interface LowProviderOptions {
  logger?: LoggerOptions
  entities?: LowBaseEntity[]
}

export interface LowDatabaseOptions<T> {
  name: string
  logger: LoggerProvider
  adapter: JSONFile<T>
  directory: LowDirectoryProvider
  initialData?: T
}

export interface LowLoggerOptions {
  path: string
  options?: LoggerOptions
}
