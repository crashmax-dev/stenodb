import { LoggerProvider, WinstonLogger } from './logger.js'
import { EntitiesMap } from './types.js'

export namespace LowEntity {
  export const Name = Symbol.for('lowdb.entityName')

  export abstract class Base {
    readonly [Name]: string = ''
  }
}

export class Entities {
  private readonly entities: EntitiesMap = new Map()
  private readonly logger: WinstonLogger

  constructor(logger: LoggerProvider) {
    this.logger = logger.createLogger('entities')
  }

  private addEntity(tableName: string, entities: LowEntity.Base[]): void {
    const tableEntities = this.getEntities(tableName)

    for (const entity of entities) {
      const entityName = entity[LowEntity.Name]
      if (typeof entity === 'function' && !entityName) continue
      tableEntities.push([entityName, entity])
      this.logger.info(`Registering entity: ${entity[LowEntity.Name]}`)
    }

    this.entities.set(tableName, tableEntities)
  }

  private getEntities(tableName: string): [string, LowEntity.Base][] {
    return this.entities.get(tableName) ?? []
  }

  registerEntities(tableName: string, entities: LowEntity.Base[]): void {
    if (!entities.length) return
    this.addEntity(tableName, entities)
  }
}
