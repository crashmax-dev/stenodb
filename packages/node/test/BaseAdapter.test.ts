import test from 'ava'
import { BaseAdapter } from '../src/adapter/BaseAdapter.js'
import { User, Users } from './fixtures/users.js'

test('BaseAdapter', (t) => {
  const initialData = new Users(new User(1, 'John Doe'))
  const baseAdapter = new BaseAdapter('users', Users, initialData)

  t.is(baseAdapter.fileName, 'users')
  t.is(baseAdapter.entity, Users)
  t.is(baseAdapter.initialData, initialData)
  t.is(baseAdapter.data, null)

  t.throws(() => new BaseAdapter('users.json', Users, initialData), {
    instanceOf: Error
  })
})
