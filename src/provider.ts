import { sep } from 'node:path'
import { JSONFile } from 'lowdb/node'
import { LowDatabase } from './database.js'
import { LowDirectoryProvider } from './directory.js'
import { Entities } from './entities.js'
import { LoggerProvider, WinstonLogger } from './logger.js'
import type { LowDatabaseInstanceOptions, LowProviderOptions } from './types.js'

export class LowProvider {
  private readonly directoryProvider: LowDirectoryProvider
  private readonly loggerProvider: LoggerProvider
  private readonly databaseLogger: WinstonLogger
  private readonly entities: Entities

  constructor({ path, logger }: LowProviderOptions) {
    this.directoryProvider = new LowDirectoryProvider(path)
    this.loggerProvider = new LoggerProvider({
      path,
      options: logger
    })

    this.entities = new Entities(this.loggerProvider)
    const databaseFolder = path.split(sep).pop() ?? 'database'
    this.databaseLogger = this.loggerProvider.createLogger(databaseFolder)
    this.directoryProvider.setLogger(this.databaseLogger)
  }

  async createDatabase<T extends unknown>({
    name,
    entity,
    initialData
  }: LowDatabaseInstanceOptions<T>): Promise<LowDatabase<T>> {
    const file = this.directoryProvider.getDatabaseFile(name)
    const adapter = new JSONFile<T>(file)

    this.directoryProvider.removeFile(file)
    this.entities.addEntity(name, entity)

    const db = new LowDatabase({
      name,
      adapter,
      logger: this.loggerProvider,
      directory: this.directoryProvider,
      entity: this.entities.getEntity(name)!
    })

    if (initialData) {
      db.initialData = initialData
    }

    await db.readData()

    return db
  }
}
