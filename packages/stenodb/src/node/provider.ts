import { sep } from 'node:path'
import { DirectoryProvider } from '../directory.js'
import { EntityProvider } from '../entity.js'
import { LoggerProvider } from '../logger.js'
import { SyncWriter } from './adapter.js'
import { NodeAdapter } from './database.js'
import type { Logger } from '../logger.js'
import type { Steno } from '../types.js'

export class NodeProvider {
  #directoryProvider: DirectoryProvider
  #loggerProvider: LoggerProvider
  #databaseLogger: Logger
  #entity: EntityProvider

  constructor({ path, logger }: Steno.DatabaseProviderOptions) {
    this.#directoryProvider = new DirectoryProvider(path)
    this.#loggerProvider = new LoggerProvider(path, logger)

    this.#entity = new EntityProvider(this.#loggerProvider)
    const databaseFolder = path.split(sep).pop() ?? 'database'
    this.#databaseLogger = this.#loggerProvider.createLogger(databaseFolder)
    this.#directoryProvider.setLogger(this.#databaseLogger)
  }

  createDatabase<T extends unknown>({
    name,
    entity,
    initialData = null
  }: Steno.DatabaseOptions<T>): NodeAdapter<T> {
    this.#entity.addEntity(name, entity)

    // TODO: add support for AsyncWriter
    const adapter = new SyncWriter<T>(name, this.#directoryProvider)
    const db = new NodeAdapter<T>({
      name,
      adapter,
      entity: this.#entity.getEntity(name),
      directory: this.#directoryProvider,
      logger: this.#loggerProvider
    })

    db.initialData ||= initialData
    db.read()

    return db
  }
}
