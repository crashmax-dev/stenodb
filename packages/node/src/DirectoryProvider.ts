import { mkdir, readFile, rmSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import { parseData } from '@stenodb/utils'
import { Writer } from 'steno'

export class DirectoryProvider {
  path: string
  filePath: string
  fileName: string
  tempDir: string

  constructor(path: string) {
    const extName = extname(path)
    if (extName) {
      throw new Error(`Path must not have a file extension ${extName}`)
    }

    this.path = path
    this.filePath = path + '.json'
    this.fileName = basename(this.path)
    this.tempDir = join(this.path, 'temp')

    mkdir(this.tempDir, { recursive: true }, (err) => {
      if (err) throw err
    })
  }

  removeFile(size = 0): void {
    readFile(this.filePath, (err, buffer) => {
      if (err) return

      if (size > 0 || buffer.byteLength === size) {
        rmSync(this.filePath)
      }
    })
  }

  createTempFile<T>(data: T) {
    const file = join(this.tempDir, `${this.fileName}-${Date.now()}.json`)
    const writer = new Writer(file)
    const parsedData =
      typeof data === 'string' ? data : parseData(data).toString()

    return {
      write: () => writer.write(parsedData),
      writeAsync: async () => await writer.write(parsedData)
    }
  }
}
