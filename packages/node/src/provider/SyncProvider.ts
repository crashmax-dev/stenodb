import { SyncAdapter } from '../index.js'
import { BaseProvider } from './BaseProvider.js'

export class SyncProvider<T> extends BaseProvider<T> {
  #adapter: SyncAdapter<T>

  constructor(adapter: SyncAdapter<T>) {
    super(adapter)
    this.#adapter = adapter
  }

  read(): T | null {
    this.#adapter.read()

    if (!this.data) {
      this.reset()
    } else {
      this.data = this.#adapter.plainData()
    }

    return this.data
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
