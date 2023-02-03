import { plainToClass } from 'class-transformer'
import type { BrowserAdapter } from './types.js'

export class BrowserProvider<T> {
  #adapter: BrowserAdapter<T>
  #data: T | null = null
  #initialData: T | null = null

  constructor(adapter: BrowserAdapter<T>) {
    this.#adapter = adapter
  }

  get data(): T | null {
    return this.#data
  }

  set data(data: T | null) {
    this.#data = data
  }

  get initialData(): T | null {
    return this.#initialData
  }

  set initialData(data: T | undefined | null) {
    if (!data) return
    this.#initialData = data
  }

  read(): T | null {
    this.#data = this.#adapter.read()

    if (!this.#data) {
      this.reset()
    } else {
      this.#data = plainToClass(this.#adapter.entity, this.#data)
    }

    return this.#data
  }

  write(): void {
    this.#adapter.write(this.#data)
  }

  reset(): void {
    if (!this.#initialData) return
    this.#data = plainToClass(this.#adapter.entity, this.#initialData)
    this.#adapter.write(this.#data)
  }

  exists(): boolean {
    return this.#adapter.exists()
  }
}
