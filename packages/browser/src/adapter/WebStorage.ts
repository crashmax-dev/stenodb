import { parseData } from '@stenodb/utils'
import type { Entity } from '../types.js'

interface SyncAdapter<T> {
  read(): T | null
  write(data: T | null): void
  exists(): boolean
}

export class BrowserStorage<T> implements SyncAdapter<T> {
  #name: string
  #storage: Storage
  #entity: Entity<T>

  constructor(name: string, storage: Storage, entity: Entity<T>) {
    this.#name = name
    this.#storage = storage
    this.#entity = entity
  }

  get entity(): Entity<T> {
    return this.#entity
  }

  read(): T | null {
    const data = this.#storage.getItem(this.#name)
    return data ? parseData<T>(data).toJSON() : null
  }

  write(data: T | null): void {
    this.#storage.setItem(this.#name, parseData(data).toString())
  }

  exists(): boolean {
    return this.read() !== null
  }
}
