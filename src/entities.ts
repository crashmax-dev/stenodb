import { LowEntity } from './types.js'
import type { LoggerProvider, WinstonLogger } from './logger.js'
import type { ClassConstructor } from 'class-transformer'

export class Entities {
  private readonly entities = new Map<string, ClassConstructor<any>>()
  private readonly logger: WinstonLogger

  constructor(logger: LoggerProvider) {
    this.logger = logger.createLogger('entities')
  }

  addEntity(tableName: string, entity: LowEntity): void {
    const existEntity = this.getEntity(tableName)
    if (existEntity || typeof entity !== 'function') return

    this.entities.set(tableName, entity)
    this.logger.info(
      `Registering entity: ${(entity as LowEntity).constructor.name}`
    )
  }

  getEntity(tableName: string): LowEntity | undefined {
    return this.entities.get(tableName)
  }
}
