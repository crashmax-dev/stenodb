import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { NodeLodash } from '@stenodb/lodash'
import { AsyncAdapter, NodeProvider } from '@stenodb/node'
import { User, Users } from './entities.js'

const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db')
const initialData = new Users(new User(1, 'John Doe'))
const adapter = new AsyncAdapter('users', Users, initialData)
const provider = new NodeProvider({ path })

const database = new NodeLodash(await provider.create(adapter))
await database.read()

function findUserById(id: number) {
  return database.data.get('users').find({ id }).value()
}

console.log(findUserById(1))
