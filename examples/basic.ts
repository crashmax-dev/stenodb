import { join } from 'node:path'
import { LowProvider } from '../src/index.js'
import { Post, User } from './entities.js'

const databasePath = join(process.cwd(), 'database')

const databaseProvider = new LowProvider(databasePath, {
  logger: { enabled: true },
  // @ts-expect-error
  entities: [User, Post]
})

const databaseUsers = await databaseProvider.createDatabase<User[]>({
  name: 'users',
  initialData: []
})

const post = new Post({ title: 'Lorem ipsum' })
const user = new User({ username: 'John Doe', posts: [post] })

if (await databaseUsers.exists()) {
  if (databaseUsers.data && databaseUsers.data.length >= 3) {
    await databaseUsers.resetData()
  }
}

databaseUsers.data?.push(user)
await databaseUsers.writeData()
