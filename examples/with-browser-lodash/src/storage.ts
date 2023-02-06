import { BrowserDatabase, LocalStorage } from '@stenodb/browser'
import lodash from 'lodash'
import { User, Users } from './entities.js'

const adapter = new LocalStorage('users', Users)
const initialData = new Users(new User(1, 'John'))

class StorageWithLodash extends BrowserDatabase<Users> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')

  constructor() {
    super(adapter, initialData)
  }

  addUser(user: User): void {
    this.chain.get('users').push(user).value()
    this.write()
  }

  getLastUserId(): number {
    return this.chain.get('users').last().get('id').value()
  }
}

export const storage = new StorageWithLodash()
storage.read()
