import { BrowserDatabase, LocalStorage } from '@stenodb/browser'
import lodash from 'lodash'
import { User, Users } from './entities.js'
import type { BrowserAdapter } from '@stenodb/browser/types'

class StorageWithLodash<T> extends BrowserDatabase<T> {
  chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')

  constructor(adapter: BrowserAdapter<T>, initialData: T) {
    super(adapter, initialData)
  }
}

const adapter = new LocalStorage('users', Users)
const initialData = new Users(new User(1, 'John'))

export const storage = new StorageWithLodash(adapter, initialData)
storage.read()

export function addUser(user: User): void {
  storage.chain.get('users').push(user).value()
  storage.write()
}

export function getLastUserId(): number {
  return storage.chain.get('users').last().get('id').value()
}
