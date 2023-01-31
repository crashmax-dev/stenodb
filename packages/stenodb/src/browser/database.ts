import { plainToClass } from 'class-transformer'
import { Steno } from '../types.js'

export class BrowserDatabase<T> {
  #adapter: Steno.BrowserAdapter<T>
  #entity: Steno.Entity<T>

  data: T | null = null
  initialData: T | null = null

  constructor(adapter: Steno.BrowserAdapter<T>, entity: Steno.Entity<T>) {
    this.#adapter = adapter
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

  reset(): T | null {
    if (!this.initialData) return null
    this.#adapter.reset(plainToClass(this.#entity, this.initialData))
    return this.read()
  }

  exists(): boolean {
    return this.#adapter.exists()
  }
}
