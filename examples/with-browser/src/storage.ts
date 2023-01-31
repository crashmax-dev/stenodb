import { BrowserProvider, LocalStorage } from 'stenodb/browser'
import { User, Users } from './entity.js'

const adapter = new LocalStorage<Users>('users')
export const storage = new BrowserProvider({
  adapter,
  entity: Users,
  initialData: new Users(new User(1, 'John'))
})
