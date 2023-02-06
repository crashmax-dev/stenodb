import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncWriter, NodeDatabase } from '@stenodb/node'
import lodash from 'lodash'
import { User, Users } from './entities.js'
import type { NodeProvider } from '@stenodb/node/types'

export class NodeWithLodash<T> {
  chain: lodash.ExpChain<T>

  constructor(private readonly provider: NodeProvider<T>) {
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
const adapter = new AsyncWriter('users', Users)
const initialData = new Users(new User(1, 'John Doe'))
const database = new NodeDatabase(path)

const usersDatabase = new NodeWithLodash(database.create(adapter, initialData))
await usersDatabase.read()

function findUserById(id: number) {
  return usersDatabase.chain.get('users').find({ id }).value()
}

console.log(findUserById(1))
