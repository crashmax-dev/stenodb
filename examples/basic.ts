import { join } from 'node:path'
import { LowProvider } from '../src/index.js'
import { Post, User } from './entities.js'

const databaseProvider = new LowProvider({
  path: join(process.cwd(), 'database'),
  logger: { enabled: true },
  entities: [User, Post]
})

const databaseUsers = await databaseProvider.createDatabase<'users', User[]>(
  'users',
  []
)

const post = new Post({ title: 'Lorem ipsum' })
const user = new User({ username: 'John Doe' })
user.addPost(post)

databaseUsers.data!.push(user)
await databaseUsers.writeData()
// await databaseUsers.resetData()
