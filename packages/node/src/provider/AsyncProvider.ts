import { plainToClass } from 'class-transformer'
import { AsyncWriter } from '../index.js'
import { BaseProvider } from './BaseProvider.js'

export class AsyncProvider<T> extends BaseProvider<T> {
  #adapter: AsyncWriter<T>

  constructor(adapter: AsyncWriter<T>, initialData?: T) {
    super()
    this.#adapter = adapter
    this.initialData = initialData
  }

  async read(): Promise<T | null> {
    this.data = await this.#adapter.read()

    if (!this.data) {
      await this.reset()
    } else {
      this.data = plainToClass(this.#adapter.entity, this.data)
    }

    return this.data
  }

  async write(): Promise<void> {
    await this.#adapter.write(this.data)
  }

  async reset(): Promise<void> {
    if (!this.initialData) return
    this.data = plainToClass(this.#adapter.entity, this.initialData)
    await this.#adapter.reset(this.data)
  }

  async exists(): Promise<boolean> {
    return await this.#adapter.exists()
  }
}
