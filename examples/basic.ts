import 'reflect-metadata'
import { join } from 'node:path'
import { NodeDatabaseProvider } from '../src/node.js'
import { Post, User, Users } from './entities.js'

const databaseProvider = new NodeDatabaseProvider({
  path: join(process.cwd(), 'database'),
  logger: { enabled: true }
})

const databaseUsers = await databaseProvider.createDatabase({
  name: 'users',
  entity: Users,
  initialData: {
    users: [new User('John Doe')]
  }
})

// databaseUsers.reset()

databaseUsers.data?.users[0]?.addPost(new Post('Lorem ipsum'))

await databaseUsers.write()
console.log(databaseUsers.data?.users)
