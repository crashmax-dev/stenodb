import type { LocalStorage } from './adapter/LocalStorage.js'
import type { SessionStorage } from './adapter/SessionStorage.js'
import type { ClassConstructor } from 'class-transformer'

export type Entity<T> = ClassConstructor<T>
export type BrowserAdapter<T> = LocalStorage<T> | SessionStorage<T>
