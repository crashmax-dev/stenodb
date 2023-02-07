import { parseData } from '@stenodb/utils'
import { plainToClass } from 'class-transformer'
import type { Steno } from '../types.js'

export class BrowserStorage<T> {
  name: string
  storage: Storage
  entity: Steno.Entity<T>

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
    this.entity = entity

    if (initialData) {
      this.initialData = initialData
    }
  }

  plainData(data: T | string | null = this.data): T | null {
    if (!data) return null

    const parsedData =
      typeof data === 'string' ? parseData<T>(data).toJSON() : data

    return plainToClass(this.entity, parsedData)
  }

  read(): void {
    const data = this.storage.getItem(this.name)
    this.data = data ? this.plainData(data) : null
  }

  write(): void {
    this.storage.setItem(this.name, parseData(this.data).toString())
  }

  reset(): void {
    if (!this.initialData) return
    this.data = plainToClass(this.entity, this.initialData)
    this.write()
  }

  exists(): boolean {
    return this.read() !== null
  }
}
