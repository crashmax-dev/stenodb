import { mkdir, readFile, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { nanoid } from './helpers.js'
import { WinstonLogger } from './logger.js'

export class LowDirectoryProvider {
  private readonly temporaryDirectory: string
  private logger: WinstonLogger

  constructor(private readonly databasePath: string) {
    this.temporaryDirectory = join(this.databasePath, 'temp')

    mkdir(this.temporaryDirectory, { recursive: true }, (err) => {
      if (err) throw err
    })
  }

  setLogger(logger: WinstonLogger): void {
    this.logger = logger
  }

  removeFile(file: string, size = 0): void {
    readFile(file, (err, buffer) => {
      if (err) return

      if (size > 0 || buffer.byteLength === size) {
        rmSync(file)
        this.logger.info(`Removed database: ${file}`)
      }
    })
  }

  createTemporaryFile(filename: string): void {
    const file = this.getDatabaseFile(filename)
    readFile(file, (err, buffer) => {
      if (err) throw err

      const tempFile = this.getDatabaseTemporaryFile(filename)
      writeFileSync(tempFile, buffer)
      this.logger.info(`Created temporary database: ${tempFile}`)
    })
  }

  getDatabaseFile(filename: string): string {
    return join(this.databasePath, `${filename}.json`)
  }

  getDatabaseTemporaryFile(filename: string): string {
    return join(
      this.temporaryDirectory,
      `${filename}-${Date.now()}-${nanoid()}.json`
    )
  }
}
