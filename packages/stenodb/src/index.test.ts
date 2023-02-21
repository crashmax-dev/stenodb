import { test } from 'uvu'
import * as assert from 'uvu/assert'
import * as packages from './index.js'

test('stenodb exports', async () => {
  const allExports = [packages]
    .reduce((acc, v) => [...acc, ...Object.keys(v)], new Array<string>())
    .filter((name) => name !== 'default')

  assert.equal(allExports, [...new Set(allExports)])
})

test.run()
