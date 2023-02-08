import { BaseProvider } from './BaseProvider.js'
import type { Steno } from '../types.js'

export class StorageProvider<T> extends BaseProvider<T> {
  #adapter: Steno.BrowserAdapter<T>

  constructor(adapter: Steno.BrowserAdapter<T>) {
    super(adapter)
    this.#adapter = adapter
  }

  read(): T | null {
    this.#adapter.read()

    if (!this.data) {
      this.reset()
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
