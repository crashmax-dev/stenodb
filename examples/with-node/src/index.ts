import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { NodeProvider } from 'stenodb/node'
import { Post, User, Users } from './entities.js'

const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'database')

const databaseProvider = new NodeProvider({
  path,
  logger: { enabled: true }
})

const databaseUsers = databaseProvider.createDatabase({
  name: 'users',
  entity: Users,
  initialData: {
    users: [new User('John Doe')]
  }
})

databaseUsers.data?.users[0]?.addPost(new Post('Lorem ipsum'))
databaseUsers.write()
