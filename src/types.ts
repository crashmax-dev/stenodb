import type { LowDirectoryProvider } from './directory.js'
import type { LowEntity } from './entities.js'
import type { LoggerProvider } from './logger.js'
import type { JSONFile } from 'lowdb/node'

export interface LoggerOptions {
  enabled: boolean
}

export interface LowProviderOptions {
  path: string
  logger?: LoggerOptions
}

export interface LowDatabaseOptions<K extends string, T extends unknown> {
  logger: LoggerProvider
  adapter: JSONFile<LowData<K, T>>
  directory: LowDirectoryProvider
  initialData?: T
}

export interface LowLoggerOptions {
  path: string
  options?: LoggerOptions
}

export type LowData<K extends string, T> =
  | {
      [name in K]: T
    }
  | Record<string, unknown>

export type EntityName = string
export type EntitiesMap = Map<EntityName, [string, LowEntity.Base][]>
