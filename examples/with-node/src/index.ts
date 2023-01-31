import 'reflect-metadata'
import { join } from 'node:path'
import { NodeProvider } from 'stenodb/node'
import { Post, User, Users } from './entities.js'

const databaseProvider = new NodeProvider({
  path: join(process.cwd(), 'database'),
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
