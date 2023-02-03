import type { NodeAdapter } from '../types.js'

export class BaseProvider<T> {
  #adapter: NodeAdapter<T>

  #data: T | null = null
  #initialData: T | null = null

  constructor(adapter: NodeAdapter<T>, initialData?: T) {
    this.#adapter = adapter

    if (initialData) {
      this.setInitialData(initialData)
    }
  }

  get data(): T | null {
    return this.#data
  }

  set data(data: T | null) {
    this.#data = data
  }

  setInitialData(data: T | null) {
    this.#initialData = data
  }
}
