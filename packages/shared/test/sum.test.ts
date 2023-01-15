import test from 'ava'
import { sum } from '../src/sum.js'

test('shared/sum', (t) => {
  t.deepEqual(sum(2, 4), 6)
})
