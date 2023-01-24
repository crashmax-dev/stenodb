import { join } from 'node:path'
import { LowProvider } from '../src/index.js'
import { Post, User } from './entities.js'

const databaseProvider = new LowProvider({
  path: join(process.cwd(), 'database'),
  logger: { enabled: true },
  entities: [User, Post]
})

const databaseUsers = await databaseProvider.createDatabase<User[]>({
  name: 'users',
  initialData: []
})

const post = new Post({ title: 'Lorem ipsum' })
const user = new User({ username: 'John Doe' })
user.addPost(post)

if (await databaseUsers.exists()) {
  if (databaseUsers.data && databaseUsers.data.length >= 3) {
    await databaseUsers.resetData()
  }
}

databaseUsers.data?.push(user)
await databaseUsers.writeData()
