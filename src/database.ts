import { getDiff } from 'json-difference'
import { Low } from 'lowdb'
import type { LowDirectoryProvider } from './directory.js'
import type { WinstonLogger } from './logger.js'
import type { LowData, LowDatabaseOptions } from './types.js'
import type { Delta } from 'json-difference/dist/models/jsondiffer.model.js'

export class LowDatabase<K extends string, V extends any> {
  private readonly db: Low<LowData<K, V>>
  private readonly name: K
  private readonly logger: WinstonLogger
  private readonly directory: LowDirectoryProvider

  data: V | null = null
  initialData: V | null = null

  constructor(
    name: K,
    { logger, adapter, directory }: LowDatabaseOptions<K, V>
  ) {
    this.db = new Low(adapter)
    this.name = name
    this.directory = directory
    this.logger = logger.createLogger(name)
  }

  setData(data: V | null): void {
    this.db.data![this.name] = data as LowData<K, V>[K]
  }

  async readData() {
    await this.db.read()

    if (!this.db.data || !this.db.data[this.name]) {
      this.logger.info(
        `Initializing database: ${this.directory.getDatabaseFile(this.name)}`,
        this.initialData
      )
      this.setData(this.initialData)
      await this.db.write()
    }

    this.data = structuredClone(this.db.data![this.name]) as V
    return this.data
  }

  async writeData(): Promise<void> {
    const diffData = this.getDifferenceData(this.db.data, this.data)
    const databasePath = this.directory.getDatabaseFile(this.name)
    this.logger.info(
      `Writing database: ${databasePath}`,
      diffData ?? 'No changes'
    )
    this.setData(this.data)
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
    data: LowData<K, V> | null,
    newData: V | null
  ): Delta | null {
    const currentData = data![this.name]
    if (!currentData || !newData) return null
    const differenceData = getDiff(currentData, newData, true)
    return differenceData
  }
}
