import lodash from 'lodash'
import type { Steno } from '@stenodb/browser'

export class BrowserLodash<T> {
  #provider: Steno.BrowserProvider<T>
  #chain: lodash.ExpChain<T>

  constructor(provider: Steno.BrowserProvider<T>) {
    this.#provider = provider
    this.#chain = lodash.chain(provider).get('data')
  }

  get data(): lodash.ExpChain<T> {
    return this.#chain
  }

  read(): T | null {
    return this.#provider.read()
  }

  write(data?: T): void {
    if (data) {
      this.#provider.data = data
    }

    this.#provider.write()
  }

  reset(data?: T): void {
    if (data) {
      this.#provider.initialData = data
    }

    this.#provider.reset()
  }

  exist(): boolean {
    return this.#provider.exists()
  }
}
