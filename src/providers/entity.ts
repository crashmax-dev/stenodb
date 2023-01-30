import type { Lowdb } from '../types.js'
import type { Logger, LoggerProvider } from './logger.js'

export class EntityProvider {
  private readonly entities = new Map<string, Lowdb.Entity>()
  private readonly logger: Logger

  constructor(logger: LoggerProvider) {
    this.logger = logger.createLogger('entity')
  }

  addEntity(name: string, entity: Lowdb.Entity): void {
    const existEntity = this.getEntity(name)
    if (existEntity || typeof entity !== 'function') return

    this.entities.set(name, entity)
    const entityName = (entity as Lowdb.Entity).constructor.name
    this.logger.info(`Lowdb.Entity '${entityName}' added to '${name}' table.`)
  }

  getEntity<T>(name: string): Lowdb.Entity<T> | undefined {
    return this.entities.get(name)
  }
}

export class EntityError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Entity'
    this.message = `EntityError: ${message}`
  }
}