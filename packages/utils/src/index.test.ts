import { test } from 'uvu'
import * as assert from 'uvu/assert'
import {
  dataTransformer,
  entityTransformer,
  getDifferenceData
} from './utils.js'

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

test('entityTransformer', () => {
  assert.equal(userEntityTransformer(userJsonData), userJsonData)
  assert.not(userEntityTransformer(null))
})

test('dataTransformer', () => {
  const transformer = dataTransformer(userEntityTransformer)
  const user = transformer.toJSON(userJsonData)!
  user.changeName('Alice')
  assert.is(user.id, 1)
  assert.is(user.name, 'Alice')
})

test('getDifferenceData', () => {
  const newUser = { name: 'Allice', role: 'user' }
  const diffData = getDifferenceData<unknown>(userData, newUser)
  assert.ok(diffData)
  assert.snapshot(
    JSON.stringify(diffData),
    '{"added":[["role","user"]],"removed":[["id",1]],"edited":[["name","John","Allice"]]}'
  )
})

test.run()
