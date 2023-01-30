import { sep } from 'node:path'
import { DirectoryProvider } from '../providers/directory.js'
import { EntityProvider } from '../providers/entity.js'
import { LoggerProvider } from '../providers/logger.js'
import { NodeAdapter } from './adapter.js'
import type { Logger } from '../providers/logger.js'
import type { Lowdb } from '../types.js'

export class NodeDatabaseProvider {
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
