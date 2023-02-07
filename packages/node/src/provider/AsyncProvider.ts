import { AsyncAdapter } from '../index.js'
import { BaseProvider } from './BaseProvider.js'

export class AsyncProvider<T> extends BaseProvider<T> {
  #adapter: AsyncAdapter<T>

  constructor(adapter: AsyncAdapter<T>) {
    super(adapter)
    this.#adapter = adapter
  }

  async read(): Promise<T | null> {
    await this.#adapter.read()

    if (!this.data) {
      await this.reset()
    } else {
      this.data = this.#adapter.plainData()
    }

    return this.data
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
