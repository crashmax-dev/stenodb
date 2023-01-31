import { parseData } from '../helpers.js'
import { Steno } from '../types.js'

export class BrowserStorage<T> implements Steno.SyncWriter<T> {
  #name: string
  #storage: Storage
  #data: T | null = null

  constructor(name: string, storage: Storage) {
    this.#name = name
    this.#storage = storage
  }

  read(): T | null {
    const data = this.#storage.getItem(this.#name)
    if (!data) return null

    try {
      this.#data = parseData(data).toJSON() as T
    } catch (err) {
      throw err
    }

    return this.#data
  }

  write(data: T | null): void {
    this.#data = data
    this.#storage.setItem(this.#name, parseData(data).toString())
  }

  reset(initialData: T): void {
    this.#storage.removeItem(this.#name)
    this.write(initialData)
  }

  exists(): boolean {
    return this.read() !== null
  }
}

export class LocalStorage<T> extends BrowserStorage<T> {
  constructor(name: string) {
    super(name, localStorage)
  }
}

export class SessionStorage<T> extends BrowserStorage<T> {
  constructor(name: string) {
    super(name, sessionStorage)
  }
}
