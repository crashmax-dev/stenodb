import { plainToClass } from 'class-transformer'
import type { Steno } from '../types.js'

export class BrowserDatabase<T> {
  #adapter: Steno.BrowserAdapter<T>
  #entity: Steno.Entity<T>

  data: T | null = null
  initialData: T | null

  constructor(adapter: Steno.BrowserAdapter<T>, entity: Steno.Entity<T>) {
    this.#adapter = adapter

    // TODO: validate entity
    this.#entity = entity
  }

  read(): T | null {
    this.data = this.#adapter.read()

    if (!this.data && this.initialData) {
      this.data = this.initialData
      this.write()
    }

    this.data = plainToClass(this.#entity, this.data)
    return this.data
  }

  write(): void {
    this.#adapter.write(this.data)
  }

  reset(): void {
    if (!this.initialData) return
    this.#adapter.reset(plainToClass(this.#entity, this.initialData))
    this.read()
  }

  exists(): boolean {
    return this.#adapter.exists()
  }
}
