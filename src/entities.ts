import { LoggerProvider, WinstonLogger } from './logger.js'

export const LowEntityName = Symbol.for('lowdb.entityName')

export abstract class LowEntityBase {
  readonly [LowEntityName]: string = ''
}

export class Entities {
  private readonly entities = new Map<string, LowEntityBase[]>()
  private readonly logger: WinstonLogger

  constructor(logger: LoggerProvider) {
    this.logger = logger.createLogger('entities')
  }

  addEntity(entity: LowEntityBase): void {
    const entities = this.entities.get(entity[LowEntityName]) ?? []
    entities.push(entity)
    this.entities.set(entity[LowEntityName], entities)
  }

  getEntities(tableName: string): LowEntityBase[] {
    return this.entities.get(tableName) ?? []
  }

  registerEntities(entities: LowEntityBase[]): void {
    for (const entity of entities) {
      if (!entity?.[LowEntityName]) {
        this.logger.error(
          'LowEntityName property is not defined. Skipping entity.',
          entity
        )
        continue
      }
      this.addEntity(entity)
    }
  }
}
