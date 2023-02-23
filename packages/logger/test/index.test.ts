import { existsSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import test from 'ava'
import { Logger } from 'tslog'
import { createLogger } from '../src/logger.js'
import { createRotation } from '../src/rotation.js'

const logsPath = resolve('logs')

test.before(async () => {
  if (existsSync(logsPath)) {
    await rm(logsPath, { recursive: true })
  }
})

test('createLogger', (t) => {
  const logger = createLogger({ type: 'pretty' })('test')
  t.true(logger instanceof Logger)
  t.assert(logger.settings.type, 'pretty')
})

test('createRotation', async (t) => {
  const rotation = createRotation({
    path: 'logs',
    size: '10M',
    interval: '1d',
    compress: 'gzip'
  })

  const logger = createLogger({
    type: 'hidden',
    rotation
  })('test-rotation')

  t.true(typeof rotation === 'function')
  t.true(logger instanceof Logger)
})
