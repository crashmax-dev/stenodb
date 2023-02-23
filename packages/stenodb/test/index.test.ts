import test from 'ava'
import * as packages from '../src/index.js'

test('stenodb exports', async (t) => {
  const allExports = [packages]
    .reduce((acc, v) => [...acc, ...Object.keys(v)], new Array<string>())
    .filter((name) => name !== 'default')

  t.deepEqual(allExports, [...new Set(allExports)])
})
