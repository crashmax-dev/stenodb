import { sep } from 'node:path'
import { DirectoryProvider } from '../directory.js'
import { EntityProvider } from '../entity.js'
import { LoggerProvider } from '../logger.js'
import { NodeAdapter } from './adapter.js'
import { StenoWriterSync } from './core.js'
import type { Logger } from '../logger.js'
import type { Steno } from '../types.js'

export class NodeDatabaseProvider {
  private readonly directoryProvider: DirectoryProvider
  private readonly loggerProvider: LoggerProvider
  private readonly databaseLogger: Logger
  private readonly entity: EntityProvider

  constructor({ path, logger }: Steno.DatabaseProviderOptions) {
    this.directoryProvider = new DirectoryProvider(path)
    this.loggerProvider = new LoggerProvider(path, logger)

    this.entity = new EntityProvider(this.loggerProvider)
    const databaseFolder = path.split(sep).pop() ?? 'database'
    this.databaseLogger = this.loggerProvider.createLogger(databaseFolder)
    this.directoryProvider.setLogger(this.databaseLogger)
  }

  create<T extends unknown>({
    name,
    entity,
    initialData
  }: Steno.DatabaseOptions<T>): NodeAdapter<T> {
    this.entity.addEntity(name, entity)

    const writer = new StenoWriterSync<T>(name, this.directoryProvider)
    const db = new NodeAdapter<T>({
      name,
      writer,
      entity: this.entity.getEntity(name),
      directory: this.directoryProvider,
      logger: this.loggerProvider
    })

    if (initialData) {
      db.initialData = initialData
    }

    db.read()

    return db
  }
}
