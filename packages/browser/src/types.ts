import type { LocalStorage } from './adapter/LocalStorage.js'
import type { SessionStorage } from './adapter/SessionStorage.js'
import type { CreateLogger } from '@stenodb/logger'

export type BrowserStorageAdapter<T> = LocalStorage<T> | SessionStorage<T>

export interface BrowserProviderOptions {
  logger?: CreateLogger
}
