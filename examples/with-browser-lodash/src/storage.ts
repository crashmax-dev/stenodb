import { BrowserProvider, LocalStorage } from '@stenodb/browser'
import { Steno } from '@stenodb/browser/types'
import lodash from 'lodash'
import { User, Users } from './entities.js'

export class BrowserWithLodash<T> {
  chain: lodash.ExpChain<T>

  constructor(private readonly provider: Steno.BrowserProvider<T>) {
    this.chain = lodash.chain(provider).get('data')
  }

  get data(): T | null {
    return this.provider.data
  }

  read(): T | null {
    return this.provider.read()
  }

  write(): void {
    this.provider.write()
  }

  reset(): void {
    this.provider.reset()
  }
}

const initialData = new Users(new User(1, 'John'))
const adapter = new LocalStorage('users', Users, initialData)
const provider = new BrowserProvider()

export const storage = new BrowserWithLodash(provider.create(adapter))
storage.read()

export function addUser(user: User): void {
  storage.chain.get('users').push(user).value()
  storage.write()
}

export function getLastUserId(): number {
  return storage.chain.get('users').last().get('id').value()
}
