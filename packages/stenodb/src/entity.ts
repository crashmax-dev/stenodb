import type { Logger, LoggerProvider } from './logger.js'
import type { Steno } from './types.js'

export class EntityProvider {
  private readonly entities = new Map<string, Steno.Entity>()
  private readonly logger: Logger

  constructor(logger: LoggerProvider) {
    this.logger = logger.createLogger('entity')
  }

  addEntity(name: string, entity: Steno.Entity): void {
    const existEntity = this.getEntity(name)
    if (existEntity || typeof entity !== 'function') return

    this.entities.set(name, entity)
    const entityName = (entity as Steno.Entity).constructor.name
    this.logger.info(`Lowdb.Entity '${entityName}' added to '${name}' table.`)
  }

  getEntity<T>(name: string): Steno.Entity<T> | undefined {
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
