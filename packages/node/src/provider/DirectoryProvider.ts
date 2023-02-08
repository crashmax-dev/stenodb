import { mkdir, readFile, rmSync } from 'node:fs'
import { join } from 'node:path'
import { Writer } from 'steno'

export class DirectoryProvider {
  databasePath: string
  temporaryPath: string

  constructor(path: string) {
    this.databasePath = path
    this.temporaryPath = join(this.databasePath, 'temp')
    this.createDatabaseDir()
  }

  private createDatabaseDir(): void {
    mkdir(this.temporaryPath, { recursive: true }, (err) => {
      if (err) throw err
    })
  }

  removeFile(path: string, size = 0): void {
    readFile(path, (err, buffer) => {
      if (err) return

      if (size > 0 || buffer.byteLength === size) {
        rmSync(path)
      }
    })
  }

  databaseFilePath(filename: string): string {
    return join(this.databasePath, `${filename}.json`)
  }

  temporaryFilePath(filename: string): string {
    return join(this.temporaryPath, `${filename}-${Date.now()}.json`)
  }

  createTemporaryFile<T>(filename: string, data: string) {
    if (!data) return

    const file = this.temporaryFilePath(filename)
    const writer = new Writer(file)

    return {
      write: () => writer.write(data),
      writeAsync: async () => await writer.write(data)
    }
  }
}
