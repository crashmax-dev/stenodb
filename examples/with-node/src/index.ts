import 'reflect-metadata'
import { join } from 'node:path'
import { NodeDatabaseProvider } from 'stenodb/node'
import { Post, User, Users } from './entities.js'

const databaseProvider = new NodeDatabaseProvider({
  path: join(process.cwd(), 'database'),
  logger: { enabled: true }
})

const databaseUsers = databaseProvider.create({
  name: 'users',
  entity: Users
})

databaseUsers.reset()
