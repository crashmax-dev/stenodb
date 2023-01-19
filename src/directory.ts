import { mkdir, readFile, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

function nanoid(): string {
  return Math.random().toString(36).slice(2)
}

export class LowDirectoryProvider {
  private baseDirectory: string
  private tempDirectory: string

  constructor(private readonly basePath: string) {
    this.initialize()
  }

  private initialize(): void {
    this.baseDirectory = this.basePath
    this.tempDirectory = join(this.basePath, 'temp')

    mkdir(this.tempDirectory, { recursive: true }, (err) => {
      if (err) throw err
      console.log('Created directory:', this.baseDirectory)
    })
  }

  removeFile(file: string, size = 0): void {
    readFile(file, (err, buffer) => {
      if (err) return

      if (size > 0 || buffer.byteLength === size) {
        rmSync(file)
      }
    })
  }

  createTempFile(filename: string): void {
    const file = this.getDatabaseFile(filename)
    readFile(file, (err, buffer) => {
      if (err) throw err

      const tempFile = this.getDatabaseTempFile(filename)
      writeFileSync(tempFile, buffer)
    })
  }

  getDatabaseFile(filename: string): string {
    return join(this.baseDirectory, `${filename}.json`)
  }

  getDatabaseTempFile(filename: string): string {
    return join(
      this.tempDirectory,
      `${filename}-${Date.now()}-${nanoid()}.json`
    )
  }
}
