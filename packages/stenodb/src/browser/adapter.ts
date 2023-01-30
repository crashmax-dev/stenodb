import { plainToClass } from 'class-transformer'
import { LowSync } from 'lowdb'
import { LocalStorage } from 'lowdb/browser'
import { DirectoryProvider } from '../providers/directory.js'
import { EntityError } from '../providers/entity.js'
import { Lowdb } from '../types.js'

export class BrowserAdapter<T extends unknown> implements Lowdb.SyncAdapter<T> {
  private readonly db: LowSync<T>
  private readonly name: string
  private readonly directory: DirectoryProvider
  private readonly entity: Lowdb.Entity<T>

  data: T | null = null
  initialData: T | null = null

  constructor({
    name,
    entity
  }: Omit<Lowdb.AdapterOptions<T>, 'logger' | 'directory'>) {
    if (!entity) {
      throw new EntityError(`Entity is not defined for '${name}' table.`)
    }

    this.name = name
    this.entity = entity

    const adapter = new LocalStorage<T>(name)
    this.db = new LowSync(adapter)
  }

  read(): T {
    this.db.read()

    if (!this.db.data && this.initialData) {
      this.db.data = this.initialData
      this.db.write()
    }

    this.data = plainToClass(this.entity, this.db.data!)
    return this.db.data!
  }

  write(): void {
    this.db.data = this.data
    this.db.write()
  }

  reset(): void {
    if (this.initialData) {
      this.data = this.initialData
      this.db.data = this.initialData
      this.write()
    }
  }

  exists(): boolean {
    return this.db.data !== null
  }
}
