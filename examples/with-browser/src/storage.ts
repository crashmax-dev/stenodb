import { BrowserProvider, LocalStorage } from '@stenodb/browser'
import { User, Users } from './entities.js'

const initialData = new Users(new User(1, 'John'))
const adapter = new LocalStorage('users', Users, initialData)
const provider = new BrowserProvider()

export const storage = provider.create(adapter)
storage.read()
