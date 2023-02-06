import { BrowserDatabase, LocalStorage } from '@stenodb/browser'
import { User, Users } from './entities.js'

const adapter = new LocalStorage('users', Users)
const initialData = new Users(new User(1, 'John'))
export const storage = new BrowserDatabase(adapter, initialData)
storage.read()
