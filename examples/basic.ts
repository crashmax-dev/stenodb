import 'reflect-metadata'
import { join } from 'node:path'
import { LowProvider } from '../src/index.js'
import { Post, User, Users } from './entities.js'

const databaseProvider = new LowProvider({
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

databaseUsers.data?.users[0]?.addPost(new Post('Lorem ipsum'))

await databaseUsers.writeData()
console.log(databaseUsers.data?.users)
