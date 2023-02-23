import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import testFn from 'ava'
import { AsyncAdapter } from '../src/index.js'
import { NodeProvider } from '../src/provider/NodeProvider.js'
import { User, Users } from './fixtures/users.js'
import type { TestFn } from 'ava'

const test = testFn as TestFn<{ provider: NodeProvider }>

test.beforeEach((t) => {
  const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db')
  t.context = {
    provider: new NodeProvider({ path })
  }
})

test('NodeProvider', async (t) => {
  const adapter = new AsyncAdapter('users', Users)
  const db = await t.context.provider.create(adapter)
  t.pass()
})
