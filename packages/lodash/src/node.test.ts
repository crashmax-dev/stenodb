import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncAdapter, NodeProvider } from '@stenodb/node'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { NodeLodash } from './node.js'

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

test('NodeLodash', async () => {
  const adapter = new AsyncAdapter('users', User)
  const db = new NodeLodash(await provider.create(adapter))
  const user1 = new User(1, 'John')
  const user2 = new User(2, 'Alice')

  if (await db.exist()) {
    await db.write(user1)
  }

  assert.equal(db.data.value(), user1)
  assert.is(db.data.get('id').value(), 1)
  assert.is(db.data.get('name').value(), 'John')

  await db.write(user2)
  assert.equal(db.data.value(), user2)
})

test.run()
