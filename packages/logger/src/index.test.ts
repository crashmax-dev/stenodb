import { existsSync } from 'node:fs'
import { readFile, rm } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { Logger } from 'tslog'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { createLogger } from './logger.js'
import { createRotation } from './rotation.js'

const logsPath = resolve('logs')

test.before(async () => {
  if (existsSync(logsPath)) {
    await rm(logsPath, { recursive: true })
  }
})

test.after(async () => {
  const logs = await readFile(join(logsPath, 'logs.log'), { encoding: 'utf-8' })
  assert.equal(logs, '')
})

const loggerRotation = createRotation({
  path: 'logs',
  size: '10M',
  interval: '1d',
  compress: 'gzip'
})

test('createLogger', () => {
  const logger = createLogger({ type: 'pretty' })('test')
  assert.instance(logger, Logger)
  assert.is(logger.settings.type, 'pretty')
})

test('createRotation', async () => {
  const logger = createLogger({
    type: 'pretty',
    rotation: loggerRotation
  })('test-rotation')

  logger.info('foo info')
  logger.warn('foo warn')
  logger.error('foo error')
  logger.debug('foo debug')

  // TODO: read logs afterEach
})

test.run()
