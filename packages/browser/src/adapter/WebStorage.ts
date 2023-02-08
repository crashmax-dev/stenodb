import { dataTransformer, entityTransformer } from '@stenodb/utils'
import type { Steno } from '../types.js'
import type { BaseLogger } from '@stenodb/logger'
import type { DataTransformer, EntityTransformer } from '@stenodb/utils'

export class BrowserStorage<T> {
  name: string
  storage: Storage
  logger: BaseLogger

  entityTransformer: EntityTransformer<T>
  dataTransformer: DataTransformer<T>

  data: T | null = null
  initialData: T | null = null

  constructor(
    name: string,
    storage: Storage,
    entity: Steno.Entity<T>,
    initialData?: T
  ) {
    this.name = name
    this.storage = storage
    this.entityTransformer = entityTransformer(entity)
    this.dataTransformer = dataTransformer(this.entityTransformer)

    if (initialData) {
      this.initialData = initialData
    }
  }

  registerLogger(logger: BaseLogger): void {
    this.logger = logger
  }

  read(): void {
    const data = this.storage.getItem(this.name)
    this.data = this.dataTransformer.toJSON(data)
    this.logger.info('Read data:', this.data)
  }

  write(): void {
    this.storage.setItem(this.name, this.dataTransformer.toString(this.data))
    this.logger.info('Write data:', this.data)
  }

  reset(): void {
    if (!this.initialData) return
    this.data = this.entityTransformer(this.initialData)
    this.write()
  }

  exists(): boolean {
    return this.read() !== null
  }
}
