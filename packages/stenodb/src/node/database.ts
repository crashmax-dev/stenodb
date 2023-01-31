import { plainToClass } from 'class-transformer'
import { EntityError } from '../entity.js'
import { getDifferenceData } from '../helpers.js'
import type { DirectoryProvider } from '../directory.js'
import type { Logger } from '../logger.js'
import type { Steno } from '../types.js'
import type { StenoWriterSync } from './adapter.js'

export class NodeAdapter<T extends unknown> {
  #writer: StenoWriterSync<T>
  #name: string
  #directory: DirectoryProvider
  #entity: Steno.Entity<T>
  #logger: Logger

  data: T | null = null
  initialData: T | null = null

  constructor({
    name,
    directory,
    entity,
    logger,
    writer
  }: Steno.SyncAdapterOptions<T>) {
    if (!entity) {
      throw new EntityError()
    }

    const file = directory.databaseFilePath(name)
    directory.removeFile(file)

    this.#name = name
    this.#directory = directory
    this.#writer = writer
    this.#entity = entity
    this.#logger = logger.createLogger(name)
  }

  read(): T {
    this.data = this.#writer.read()

    if (!this.data && this.initialData) {
      this.#logger.info(
        `Initializing database: ${this.#directory.databaseFilePath(
          this.#name
        )}`,
        this.initialData
      )
      this.data = this.initialData
      this.#writer.write(this.data)
    }

    this.data = plainToClass(this.#entity, this.data)
    return this.data
  }

  write(): void {
    const diffData = getDifferenceData(this.data, this.#writer.read())
    const databasePath = this.#directory.databaseFilePath(this.#name)
    this.#logger.info(
      `Writing database: ${databasePath}`,
      diffData ?? 'No changes'
    )
    this.#writer.write(this.data)
  }

  reset(): void {
    if (this.initialData) {
      this.#writer.reset(this.initialData)
      this.#logger.info(
        `Resetting database: ${this.#directory.databaseFilePath(this.#name)}`,
        this.initialData
      )
      this.data = this.initialData
      this.write()
    }
  }

  exists(): boolean {
    return this.#writer.exists()
  }
}
