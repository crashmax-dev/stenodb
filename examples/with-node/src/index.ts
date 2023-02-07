import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncAdapter, NodeProvider } from '@stenodb/node'
import { Post, User, Users } from './entities.js'

const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'database')
const initialData = new Users(new User('John Doe'))
const adapter = new AsyncAdapter('users', Users, initialData)
const provider = new NodeProvider(path)

const database = provider.createAsync(adapter)
await database.read()
const post = new Post('Hello world')
database.data?.users[0]?.addPost(post)
await database.write()

console.log(database.data)
