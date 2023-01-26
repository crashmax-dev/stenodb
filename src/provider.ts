import { sep } from 'node:path'
import { JSONFile } from 'lowdb/node'
import { LowDatabase } from './database.js'
import { LowDirectoryProvider } from './directory.js'
import { Entities, LowEntity } from './entities.js'
import { LoggerProvider, WinstonLogger } from './logger.js'
import type { LowData, LowProviderOptions } from './types.js'

export class LowProvider {
  private readonly directoryProvider: LowDirectoryProvider
  private readonly loggerProvider: LoggerProvider
  private readonly databaseLogger: WinstonLogger
  private readonly entities: Entities

  constructor({ path, entities, logger }: LowProviderOptions) {
    this.directoryProvider = new LowDirectoryProvider(path)
    this.loggerProvider = new LoggerProvider({
      path,
      options: logger
    })

    this.entities = new Entities(this.loggerProvider)
    this.entities.registerEntities((entities as LowEntity.Base[]) ?? [])
    const databaseFolder = path.split(sep).pop() ?? 'database'
    this.databaseLogger = this.loggerProvider.createLogger(databaseFolder)
    this.directoryProvider.setLogger(this.databaseLogger)
  }

  async createDatabase<K extends string, V extends unknown>(
    name: K,
    initialData: V
  ): Promise<LowDatabase<K, V>> {
    const file = this.directoryProvider.getDatabaseFile(name)
    const adapter = new JSONFile<LowData<K, V>>(file)
    this.directoryProvider.removeFile(file)

    const db = new LowDatabase(name, {
      adapter,
      logger: this.loggerProvider,
      directory: this.directoryProvider
    })

    if (initialData) {
      db.initialData = initialData
    }

    await db.readData()

    return db
  }
}
