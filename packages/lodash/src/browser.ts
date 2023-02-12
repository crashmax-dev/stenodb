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

  write(): void {
    this.#provider.write()
  }

  reset(): void {
    this.#provider.reset()
  }
}
