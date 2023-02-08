import { BrowserProvider, LocalStorage } from '@stenodb/browser'
import { createLogger } from '@stenodb/logger'
import { User, Users } from './entities.js'

const initialData = new Users(new User(1, 'John'))
const adapter = new LocalStorage('users', Users, initialData)
const provider = new BrowserProvider({ logger: createLogger() })

export const storage = provider.create(adapter)
storage.read()
