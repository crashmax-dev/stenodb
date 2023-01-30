import { plainToClass } from 'class-transformer'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { getDifferenceData } from '../helpers.js'
import { DirectoryProvider } from '../providers/directory.js'
import { EntityError } from '../providers/entity.js'
import { Logger } from '../providers/logger.js'
import { Lowdb } from '../types.js'

export class NodeAdapter<T extends unknown> implements Lowdb.AsyncAdapter<T> {
  private readonly name: string
  private readonly db: Lowdb.Adapter<T>
  private readonly directory: DirectoryProvider
  private readonly entity: Lowdb.Entity<T>
  private readonly logger: Logger

  data: T | null = null
  initialData: T | null = null

  constructor({ name, directory, entity, logger }: Lowdb.AdapterOptions<T>) {
    if (!entity) {
      throw new EntityError(`Entity is not defined for '${name}' table.`)
    }

    const file = directory.getDatabaseFile(name)
    directory.removeFile(file)

    this.name = name
    this.directory = directory
    this.entity = entity
    this.logger = logger.createLogger(name)

    const adapter = new JSONFile<T>(file)
    this.db = new Low(adapter)
  }

  async read(): Promise<T> {
    await this.db.read()

    if (!this.db.data && this.initialData) {
      this.logger.info(
        `Initializing database: ${this.directory.getDatabaseFile(this.name)}`,
        this.initialData
      )
      this.db.data = this.initialData
      await this.db.write()
    }

    this.data = plainToClass(this.entity, this.db.data)
    return this.data
  }

  async write(): Promise<void> {
    const diffData = getDifferenceData(this.db.data, this.data)
    const databasePath = this.directory.getDatabaseFile(this.name)
    this.logger.info(
      `Writing database: ${databasePath}`,
      diffData ?? 'No changes'
    )
    this.db.data = this.data
    await this.db.write()
  }

  async reset(): Promise<void> {
    if (this.initialData) {
      this.directory.createTemporaryFile(this.name)
      this.logger.info(
        `Resetting database: ${this.directory.getDatabaseFile(this.name)}`,
        this.initialData
      )
      this.data = this.initialData
      await this.write()
    }
  }

  async exists(): Promise<boolean> {
    return (await this.read()) !== null
  }
}
