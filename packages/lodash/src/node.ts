import lodash from 'lodash'
import type { Steno } from '@stenodb/node'

export class NodeLodash<T> {
  #provider: Steno.NodeProvider<T>
  #chain: lodash.ExpChain<T>

  constructor(provider: Steno.NodeProvider<T>) {
    this.#provider = provider
    this.#chain = lodash.chain(provider).get('data')
  }

  get data(): lodash.ExpChain<T> {
    return this.#chain
  }

  async read(): Promise<T | null> {
    return await this.#provider.read()
  }

  async write(): Promise<void> {
    await this.#provider.write()
  }

  async reset(): Promise<void> {
    await this.#provider.reset()
  }
}
