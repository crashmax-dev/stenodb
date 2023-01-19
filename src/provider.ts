import { JSONFile } from 'lowdb/node'
import { LowDatabase } from './database.js'
import { LowDirectoryProvider } from './directory.js'

export class LowProvider {
  private readonly directoryProvider: LowDirectoryProvider

  constructor(databasePath: string) {
    this.directoryProvider = new LowDirectoryProvider(databasePath)
  }

  async createDatabase<T extends unknown>(
    filename: string,
    initialData?: T
  ): Promise<LowDatabase<T>> {
    const file = this.directoryProvider.getDatabaseFile(filename)
    const adapter = new JSONFile<T>(file)
    this.directoryProvider.removeFile(file)

    const db = new LowDatabase<T>(
      adapter,
      filename,
      this.directoryProvider,
      initialData
    )

    await db.read()

    if (initialData) {
      db.data ||= initialData
      await db.write()
    }

    return db
  }
}
