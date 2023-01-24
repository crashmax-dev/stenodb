import { LowBaseEntity } from './entities.js'
import type { LowDirectoryProvider } from './directory.js'
import type { LoggerProvider } from './logger.js'
import type { JSONFile } from 'lowdb/node'

export interface LoggerOptions {
  enabled: boolean
}

export interface LowProviderOptions {
  path: string
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
