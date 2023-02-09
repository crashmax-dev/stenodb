import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { Writer } from '@stenodb/writer'

export class DirectoryProvider {
  databasePath: string
  temporaryPath: string

  constructor(path: string) {
    this.databasePath = path
    this.temporaryPath = join(this.databasePath, 'temp')
  }

  async createDatabaseDir(): Promise<void> {
    try {
      await mkdir(this.temporaryPath, { recursive: true })
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw err
      }
    }
  }

  databaseFilePath(filename: string): string {
    return join(this.databasePath, `${filename}.json`)
  }

  temporaryFilePath(filename: string): string {
    return join(this.temporaryPath, `${filename}-${Date.now()}.json`)
  }

  writerTemporaryFile(filename: string) {
    const file = this.temporaryFilePath(filename)
    return new Writer(file)
  }
}
