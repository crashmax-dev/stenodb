import { LoggerProvider, WinstonLogger } from './logger.js'

export abstract class LowBaseEntity {
  readonly tableName: string = ''
}

export class Entities {
  private readonly entities = new Map<string, LowBaseEntity[]>()
  private readonly logger: WinstonLogger

  constructor(logger: LoggerProvider) {
    this.logger = logger.createLogger('entities')
  }

  addEntity(entity: LowBaseEntity): void {
    const entities = this.entities.get(entity.tableName) ?? []
    entities.push(entity)
    this.entities.set(entity.tableName, entities)
  }

  getEntities(tableName: string): LowBaseEntity[] {
    return this.entities.get(tableName) ?? []
  }

  registerEntities(entities: LowBaseEntity[]): void {
    for (const entity of entities) {
      if (!entity?.tableName) {
        this.logger.error(
          'Entity does not have a table name. Skipping entity.',
          entity
        )
        continue
      }
      this.addEntity(entity)
    }
  }
}
