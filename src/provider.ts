import { sep } from 'node:path'
import { JSONFile } from 'lowdb/node'
import { LowDatabase } from './database.js'
import { LowDirectoryProvider } from './directory.js'
import { LoggerProvider, WinstonLogger } from './logger.js'
import type { ProviderOptions } from './types.js'

export class LowProvider {
  private readonly directoryProvider: LowDirectoryProvider
  private readonly loggerProvider: LoggerProvider
  private readonly databaseLogger: WinstonLogger

  constructor(databasePath: string, options: ProviderOptions = {}) {
    this.directoryProvider = new LowDirectoryProvider(databasePath)
    this.loggerProvider = new LoggerProvider(
      databasePath,
      options.logger ?? { enabled: false }
    )

    const databaseFolder = databasePath.split(sep).pop() ?? 'database'
    this.databaseLogger = this.loggerProvider.createLogger(databaseFolder)
    this.directoryProvider.setLogger(this.databaseLogger)
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
      this.loggerProvider,
      filename,
      this.directoryProvider
    )

    db.setInitialData(initialData)

    await db.read()

    if (initialData && !db.data) {
      this.databaseLogger.info(`Initializing database: ${file}`, initialData)
      db.data ||= initialData
      await db.write()
    }

    return db
  }
}
