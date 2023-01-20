import { join } from 'node:path'
import { LowProvider } from '../src/index.js'
import { Post, User } from './entities.js'

const databasePath = join(process.cwd(), 'database')
const databaseProvider = new LowProvider(databasePath, {
  logger: { enabled: true }
})
const databaseUsers = await databaseProvider.createDatabase<User[]>('users', [])

const post = new Post('Lorem ipsum')
const user = new User('John', post)

if (await databaseUsers.exists()) {
  if (databaseUsers.data && databaseUsers.data.length >= 3) {
    await databaseUsers.resetData()
  }
}

databaseUsers.data?.push(user)
await databaseUsers.writeData()
