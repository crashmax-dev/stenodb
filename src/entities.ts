export class LowBaseEntity {
  constructor(readonly tableName: string) {}
}

export class Entities {
  private readonly entities = new Map<string, LowBaseEntity[]>()

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
      this.addEntity(entity)
    }
  }
}
