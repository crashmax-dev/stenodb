import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncAdapter, NodeProvider } from '@stenodb/node'
import lodash from 'lodash'
import { User, Users } from './entities.js'
import type { Steno } from '@stenodb/node/types'

export class NodeWithLodash<T> {
  chain: lodash.ExpChain<T>

  constructor(private readonly provider: Steno.NodeProvider<T>) {
    this.chain = lodash.chain(provider).get('data')
  }

  get data(): T | null {
    return this.provider.data
  }

  async read(): Promise<void> {
    await this.provider.read()
  }

  async write(): Promise<void> {
    await this.provider.write()
  }
}

const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'database')
const initialData = new Users(new User(1, 'John Doe'))
const adapter = new AsyncAdapter('users', Users, initialData)
const provider = new NodeProvider(path)

const database = new NodeWithLodash(provider.createAsync(adapter))
await database.read()
await database.write()

function findUserById(id: number) {
  return database.chain.get('users').find({ id }).value()
}

console.log(findUserById(1))
