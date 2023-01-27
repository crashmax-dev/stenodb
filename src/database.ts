import { plainToClass } from 'class-transformer'
import { getDiff } from 'json-difference'
import { Low } from 'lowdb'
import type { LowDirectoryProvider } from './directory.js'
import type { WinstonLogger } from './logger.js'
import type { LowDatabaseOptions, LowEntity } from './types.js'
import type { Delta } from 'json-difference/dist/models/jsondiffer.model.js'

export class LowDatabase<T extends any> {
  private readonly db: Low<T>
  private readonly name: string
  private readonly logger: WinstonLogger
  private readonly directory: LowDirectoryProvider
  private readonly entity: LowEntity<T>

  data: T | null = null
  initialData: T | null = null

  constructor({
    name,
    logger,
    adapter,
    directory,
    entity
  }: LowDatabaseOptions<T>) {
    this.db = new Low(adapter)
    this.name = name
    this.directory = directory
    this.entity = entity
    this.logger = logger.createLogger(name)
  }

  async readData() {
    await this.db.read()

    if (!this.db.data || !this.db.data) {
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

  async writeData(): Promise<void> {
    const diffData = this.getDifferenceData(this.db.data, this.data)
    const databasePath = this.directory.getDatabaseFile(this.name)
    this.logger.info(
      `Writing database: ${databasePath}`,
      diffData ?? 'No changes'
    )
    this.db.data = this.data
    await this.db.write()
  }

  async resetData(): Promise<void> {
    if (this.initialData) {
      this.directory.createTemporaryFile(this.name)
      this.logger.info(
        `Resetting database: ${this.directory.getDatabaseFile(this.name)}`,
        this.initialData
      )
      this.data = this.initialData
      await this.writeData()
    }
  }

  async exists(): Promise<boolean> {
    return (await this.readData()) !== null
  }

  private getDifferenceData(
    currentData: T | null,
    newData: T | null
  ): Delta | null {
    if (!currentData || !newData) return null
    const differenceData = getDiff(currentData, newData, true)
    return differenceData
  }
}
