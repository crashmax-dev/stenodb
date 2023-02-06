import { plainToClass } from 'class-transformer'
import { SyncWriter } from '../index.js'
import { BaseProvider } from './BaseProvider.js'

export class SyncProvider<T> extends BaseProvider<T> {
  #adapter: SyncWriter<T>

  constructor(adapter: SyncWriter<T>, initialData?: T) {
    super()

    this.#adapter = adapter
    this.initialData = initialData
  }

  read(): T | null {
    this.data = this.#adapter.read()

    if (!this.data) {
      this.reset()
    } else {
      this.data = plainToClass(this.#adapter.entity, this.data)
    }

    return this.data
  }

  write(): void {
    this.#adapter.write(this.data)
  }

  reset(): void {
    if (!this.initialData) return
    this.data = plainToClass(this.#adapter.entity, this.initialData)
    this.#adapter.reset(this.data)
  }

  exists(): boolean {
    return this.#adapter.exists()
  }
}
