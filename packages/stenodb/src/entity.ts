import type { Logger, LoggerProvider } from './logger.js'
import type { Steno } from './types.js'

export class EntityProvider {
  #entities = new Map<string, Steno.Entity>()
  #logger: Logger

  constructor(logger: LoggerProvider) {
    this.#logger = logger.createLogger('entity')
  }

  addEntity(name: string, entity: Steno.Entity): void {
    const existEntity = this.getEntity(name)
    if (existEntity || typeof entity !== 'function') return

    this.#entities.set(name, entity)
    this.#logger.info(`Entity "${entity.name}" register for "${name}" table.`)
  }

  getEntity<T>(name: string): Steno.Entity<T> | undefined {
    return this.#entities.get(name)
  }
}

export class EntityError extends Error {
  constructor(name: string) {
    super()
    this.message = `EntityError: Entity not registered for ${name} table.`
  }
}
