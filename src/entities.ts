import { LoggerProvider, WinstonLogger } from './logger.js'

export namespace LowEntity {
  export const Name = Symbol.for('lowdb.entityName')

  export abstract class Base {
    readonly [Name]: string = ''
  }
}

export class Entities {
  private readonly entities = new Map<string, LowEntity.Base[]>()
  private readonly logger: WinstonLogger

  constructor(logger: LoggerProvider) {
    this.logger = logger.createLogger('entities')
  }

  private addEntity(entity: LowEntity.Base): void {
    const entities = this.entities.get(entity[LowEntity.Name]) ?? []
    entities.push(entity)
    this.entities.set(entity[LowEntity.Name], entities)
  }

  getEntities(tableName: string): LowEntity.Base[] {
    return this.entities.get(tableName) ?? []
  }

  registerEntities(entities: LowEntity.Base[]): void {
    for (const entity of entities) {
      if (!entity?.[LowEntity.Name]) continue
      this.logger.info('Registering entity:', entity[LowEntity.Name])
      this.addEntity(entity)
    }
  }
}
