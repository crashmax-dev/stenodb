import { mkdirSync, readFile, rmSync } from 'node:fs'
import { join } from 'node:path'
import { JSONFile } from 'lowdb/node'
import { LowDatabase } from './database.js'

export class LowProvider {
  constructor(private readonly databasePath: string) {
    this.initializeFolder()
  }

  private initializeFolder(): void {
    mkdirSync(this.databasePath, { recursive: true })
  }

  private removeEmptyFile(file: string): void {
    readFile(file, (err, buffer) => {
      if (err) return

      if (buffer.byteLength) {
        rmSync(file)
      }
    })
  }

  private getDatabaseFilePath(filename: string) {
    return join(this.databasePath, `${filename}.json`)
  }

  async createDatabase<T extends unknown>(
    filename: string,
    initialData?: T
  ): Promise<LowDatabase<T>> {
    const file = this.getDatabaseFilePath(filename)
    const adapter = new JSONFile<T>(file)
    this.removeEmptyFile(file)

    const db = new LowDatabase<T>(adapter, initialData)
    await db.read()

    if (initialData) {
      db.data ||= initialData
      db.write()
    }

    return db
  }

  removeDatabase(filename: string): void {
    const file = this.getDatabaseFilePath(filename)
    rmSync(file)
  }
}
