import { join } from 'node:path'
import { LowProvider } from '../src/index.js'
import { Post, User } from './entities.js'

const databasePath = join(process.cwd(), 'database')
const databaseProvider = new LowProvider(databasePath)
const databaseUsers = await databaseProvider.createDatabase<User[]>('users', [])

const post = new Post('Lorem ipsum')
const user = new User('John', post)
user.posts.push(post)

await databaseUsers.writeData([user])
await databaseUsers.resetData()

console.log(user)
