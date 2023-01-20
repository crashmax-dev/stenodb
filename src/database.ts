import { Low } from 'lowdb'
import { LowDirectoryProvider } from './directory.js'
import { LoggerProvider, WinstonLogger } from './logger.js'
import type { JSONFile } from 'lowdb/node'

export class LowDatabase<T extends unknown> extends Low<T> {
  private readonly logger: WinstonLogger
  private initialData: T | undefined

  constructor(
    adapter: JSONFile<T>,
    logger: LoggerProvider,
    private readonly filename: string,
    private readonly directoryProvider: LowDirectoryProvider
  ) {
    super(adapter)
    this.logger = logger.createLogger(filename)
  }

  setInitialData(initialData: T | undefined): void {
    this.initialData = initialData
  }

  async writeData(data?: T): Promise<void> {
    this.data = data ?? this.data
    this.logger.info(
      `Writing database: ${this.directoryProvider.getDatabaseFile(
        this.filename
      )}`
    )
    await this.write()
  }

  async resetData(): Promise<void> {
    if (this.initialData) {
      this.directoryProvider.createTemporaryFile(this.filename)
      this.logger.info(
        `Resetting database: ${this.directoryProvider.getDatabaseFile(
          this.filename
        )}`,
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
