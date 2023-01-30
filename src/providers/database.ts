import { sep } from 'node:path'
import { NodeAdapter } from '../adapters/node.js'
import { DirectoryProvider } from './directory.js'
import { EntityProvider } from './entity.js'
import { Logger, LoggerProvider } from './logger.js'
import type { Lowdb } from '../types.js'

export class DatabaseProvider {
  private readonly directoryProvider: DirectoryProvider
  private readonly loggerProvider: LoggerProvider
  private readonly databaseLogger: Logger
  private readonly entity: EntityProvider

  constructor({ path, logger }: Lowdb.DatabaseProviderOptions) {
    this.directoryProvider = new DirectoryProvider(path)
    this.loggerProvider = new LoggerProvider(path, logger)

    this.entity = new EntityProvider(this.loggerProvider)
    const databaseFolder = path.split(sep).pop() ?? 'database'
    this.databaseLogger = this.loggerProvider.createLogger(databaseFolder)
    this.directoryProvider.setLogger(this.databaseLogger)
  }

  async createDatabase<T extends unknown>({
    name,
    entity,
    initialData
  }: Lowdb.DatabaseOptions<T>): Promise<NodeAdapter<T>> {
    this.entity.addEntity(name, entity)

    const db = new NodeAdapter<T>({
      name,
      entity: this.entity.getEntity<T>(name),
      logger: this.loggerProvider,
      directory: this.directoryProvider
    })

    if (initialData) {
      db.initialData = initialData
    }

    await db.read()

    return db
  }
}
