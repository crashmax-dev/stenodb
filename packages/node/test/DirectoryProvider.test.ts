import { join, resolve } from 'node:path'
import { Writer } from '@stenodb/writer'
import test from 'ava'
import { DirectoryProvider } from '../src/provider/DirectoryProvider.js'

test('DirectoryProvider', async (t) => {
  const path = resolve('db')
  const directoryProvider = new DirectoryProvider(path)
  await directoryProvider.createDirectory().withAsync()

  t.is(directoryProvider.databasePath, path)
  t.is(directoryProvider.temporaryPath, join(path, 'temp'))
  t.is(directoryProvider.databaseFilePath('users'), join(path, 'users.json'))
  t.true(directoryProvider.writerTemporaryFile('users') instanceof Writer)
})
