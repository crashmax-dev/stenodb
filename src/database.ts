import { getDiff } from 'json-difference'
import { Low } from 'lowdb'
import { LowDirectoryProvider } from './directory.js'
import { WinstonLogger } from './logger.js'
import { LowDatabaseOptions } from './types.js'

export class LowDatabase<T extends unknown> extends Low<T> {
  private readonly name: string
  private readonly logger: WinstonLogger
  private readonly directory: LowDirectoryProvider

  private initialData: T | undefined
  private temporaryData: T | null = null

  constructor({ name, logger, adapter, directory }: LowDatabaseOptions<T>) {
    super(adapter)
    this.name = name
    this.directory = directory
    this.logger = logger.createLogger(name)
  }

  setInitialData(initialData: T | undefined): void {
    this.initialData = initialData
  }

  async writeData(data?: T): Promise<void> {
    const newData = this.temporaryData ?? data ?? this.data
    const diffData = getDiff(this.data!, newData!, true)
    this.data = newData
    this.temporaryData = null

    const databasePath = this.directory.getDatabaseFile(this.name)
    this.logger.info(`Writing database: ${databasePath}`, diffData)
    await this.write()
  }

  async resetData(): Promise<void> {
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
    await this.read()
    return this.data !== null
  }
}
