import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncWriter, NodeDatabase } from '@stenodb/node'
import { Post, User, Users } from './entities.js'

const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'database')
const adapter = new AsyncWriter('users', Users)
const database = new NodeDatabase(path)

const usersDatabase = database.create(adapter, new Users(new User('John Doe')))
await usersDatabase.read()

const post = new Post('Hello world')
usersDatabase.data?.users[0]?.addPost(post)
await usersDatabase.write()

console.log(usersDatabase.data)
