import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncWriter, NodeDatabase } from '@stenodb/node'
import lodash from 'lodash'
import { User, Users } from './entities.js'
import type { NodeProvider } from '@stenodb/node/types'

const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'database')
const adapter = new AsyncWriter('users', Users)

class NodeWithLodash<T> {
  provider: NodeProvider<T>
  chain: lodash.ExpChain<T>

  constructor(provider: NodeProvider<T>) {
    this.provider = provider
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

const db = new NodeDatabase(path)
const usersDatabase = new NodeWithLodash(
  db.create(adapter, new Users(new User(1, 'John Doe')))
)

await usersDatabase.read()
const user = usersDatabase.chain.get('users').find({ id: 1 }).value()
console.log(user)
