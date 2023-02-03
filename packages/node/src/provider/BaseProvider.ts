import type { NodeAdapter } from '../types.js'

export class BaseProvider<T> {
  #adapter: NodeAdapter<T>

  #data: T | null = null
  #initialData: T | null = null

  constructor(adapter: NodeAdapter<T>) {
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
}
