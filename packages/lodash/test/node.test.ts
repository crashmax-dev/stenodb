import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncAdapter, NodeProvider } from '@stenodb/node'
import test from 'ava'
import { NodeLodash } from '../src/node.js'

const provider = new NodeProvider({
  path: resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db')
})

class User {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
}

test('NodeLodash', async (t) => {
  const adapter = new AsyncAdapter('users', User)
  const db = new NodeLodash(await provider.create(adapter))
  const user1 = new User(1, 'John')
  const user2 = new User(2, 'Alice')

  if (await db.exist()) {
    await db.write(user1)
  }

  t.deepEqual(db.data.value(), user1)
  t.is(db.data.get('id').value(), 1)
  t.is(db.data.get('name').value(), 'John')

  await db.write(user2)
  t.deepEqual(db.data.value(), user2)
})
