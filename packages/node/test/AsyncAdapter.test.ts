import test from 'ava'
import { AsyncAdapter } from '../src/adapter/AsyncAdapter.js'
import { User, Users } from './fixtures/users.js'

test('AsyncAdapter', async (t) => {
  const initialData = new Users(new User(1, 'John Doe'))
  const asyncAdapter = new AsyncAdapter('users', Users, initialData)

  t.is(asyncAdapter.fileName, 'users')
  t.is(asyncAdapter.entity, Users)
  t.is(asyncAdapter.initialData, initialData)
  t.is(asyncAdapter.data, null)
})
