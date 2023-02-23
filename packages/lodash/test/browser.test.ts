import { BrowserProvider, LocalStorage } from '@stenodb/browser'
import test from 'ava'
import { BrowserLodash } from '../src/browser.js'

const storage = new Map<string, string>()
const mockStorage = () => ({
  length: 0,
  getItem: (key: string): string | null => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem(key: string): void {
    storage.delete(key)
  },
  clear(): void {
    storage.clear()
  },
  key(index: number): string | null {
    return Object.values(storage.values())[index] ?? null
  }
})

global.localStorage = mockStorage()
global.sessionStorage = mockStorage()

class User {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
}

test('BrowserLodash', (t) => {
  const user1 = new User(1, 'John')
  const user2 = new User(2, 'Alice')
  const adapter = new LocalStorage('users', User, user1)
  const provider = new BrowserProvider()
  const db = new BrowserLodash(provider.create(adapter))

  db.read()
  t.deepEqual(db.data.value(), user1)

  db.write(user2)
  t.deepEqual(db.data.value(), user2)

  db.reset()
  t.deepEqual(db.data.value(), user1)
  t.is(db.data.get('id').value(), 1)
  t.is(db.data.get('name').value(), 'John')
})
