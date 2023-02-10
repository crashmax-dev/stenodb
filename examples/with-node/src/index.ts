import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createLogger } from '@stenodb/logger'
import { createRotation } from '@stenodb/logger/rotation'
import { AsyncAdapter, NodeProvider } from '@stenodb/node'
import { Post, User, Users } from './entities.js'

const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'database')
const logger = createLogger({
  rotation: createRotation({
    path: 'logs',
    size: '10M', // rotate every 10 MegaBytes written
    interval: '1d', // rotate daily
    compress: 'gzip' // compress rotated files
  })
})

const initialData = new Users(new User('John Doe'))
const adapter = new AsyncAdapter('users', Users, initialData)
const provider = new NodeProvider({ path, logger })

const database = await provider.create(adapter)
await database.read()
const post = new Post('Hello world')
database.data?.users[0]?.addPost(post)
await database.write()

console.log(database.data)
