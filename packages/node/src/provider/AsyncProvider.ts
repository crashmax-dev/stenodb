import { AsyncAdapter } from '../index.js'

export class AsyncProvider<T> {
  #adapter: AsyncAdapter<T>

  constructor(adapter: AsyncAdapter<T>) {
    this.#adapter = adapter
  }

  get data(): T | null {
    return this.#adapter.data
  }

  set data(data: T | null) {
    this.#adapter.data = data
  }

  get initialData(): T | null {
    return this.#adapter.initialData
  }

  set initialData(data: T | undefined | null) {
    if (!data) return
    this.#adapter.initialData = data
  }

  async read(): Promise<T | null> {
    await this.#adapter.read()

    if (!this.#adapter.data) {
      await this.reset()
    }

    return this.#adapter.data
  }

  async write(): Promise<void> {
    await this.#adapter.write()
  }

  async reset(): Promise<void> {
    await this.#adapter.reset()
  }

  async exists(): Promise<boolean> {
    return await this.#adapter.exists()
  }
}
