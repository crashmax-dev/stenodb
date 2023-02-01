import lodash from 'lodash'
import { BrowserProvider, LocalStorage } from 'stenodb/browser'
import { User, Users } from './entities.js'

class StorageWithLodash extends BrowserProvider<Users> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')

  constructor() {
    super({
      entity: Users,
      adapter: new LocalStorage<Users>('users'),
      initialData: new Users(new User(1, 'John'))
    })
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
