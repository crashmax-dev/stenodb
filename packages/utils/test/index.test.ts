import test from 'ava'
import {
  dataTransformer,
  entityTransformer,
  getDifferenceData
} from '../src/utils.js'

class User {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  changeName(name: string): void {
    this.name = name
  }
}

const userData = { id: 1, name: 'John' }
const userJsonData = JSON.stringify(userData)
const userEntityTransformer = entityTransformer(User)

test('entityTransformer', (t) => {
  t.deepEqual(userEntityTransformer(userJsonData), userJsonData)
  t.falsy(userEntityTransformer(null))
})

test('dataTransformer', (t) => {
  const transformer = dataTransformer(userEntityTransformer)
  const user = transformer.toJSON(userJsonData)!
  user.changeName('Alice')
  t.is(user.id, 1)
  t.is(user.name, 'Alice')
})

test('getDifferenceData', (t) => {
  const newUser = { name: 'Allice', role: 'user' }
  const diffData = getDifferenceData<unknown>(userData, newUser)
  t.truthy(diffData)
  t.snapshot(JSON.stringify(diffData))
})
