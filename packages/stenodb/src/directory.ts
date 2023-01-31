import { mkdir, readFile, rmSync } from 'node:fs'
import { join } from 'node:path'
import { Writer } from 'steno'
import { nanoid, parseData } from './helpers.js'
import { Logger } from './logger.js'

export class DirectoryProvider {
  private readonly temporaryDirectory: string
  private logger: Logger

  constructor(private readonly databasePath: string) {
    this.temporaryDirectory = join(this.databasePath, 'temp')

    mkdir(this.temporaryDirectory, { recursive: true }, (err) => {
      if (err) throw err
    })
  }

  setLogger(logger: Logger): void {
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

  databaseFilePath(filename: string): string {
    return join(this.databasePath, `${filename}.json`)
  }

  temporaryFilePath(filename: string): string {
    return join(
      this.temporaryDirectory,
      `${filename}-${Date.now()}-${nanoid()}.json`
    )
  }

  createTempFile<T>(filename: string, data: T) {
    const tempFile = this.temporaryFilePath(filename)
    const tempFileWriter = new Writer(tempFile)
    tempFileWriter.write(parseData(data).toString())
  }
}
