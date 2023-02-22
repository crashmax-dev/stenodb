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

  async write(data?: T): Promise<void> {
    if (data) {
      this.#provider.data = data
    }

    await this.#provider.write()
  }

  async reset(data?: T): Promise<void> {
    if (data) {
      this.#provider.initialData = data
    }

    await this.#provider.reset()
  }

  async exist(): Promise<boolean> {
    return this.#provider.exists()
  }
}
