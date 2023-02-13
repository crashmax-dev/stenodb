import { SyncAdapter } from '../index.js'

export class SyncProvider<T> {
  #adapter: SyncAdapter<T>

  constructor(adapter: SyncAdapter<T>) {
    this.#adapter = adapter
  }

  get data(): T | null {
    return this.data
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

  read(): T | null {
    this.#adapter.read()

    if (!this.#adapter.data) {
      this.reset()
    }

    return this.#adapter.data
  }

  write(): void {
    this.#adapter.write()
  }

  reset(): void {
    this.#adapter.reset()
  }

  exists(): boolean {
    return this.#adapter.exists()
  }
}
