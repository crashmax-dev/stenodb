import { plainToClass } from 'class-transformer'
import { EntityError } from '../entity.js'
import { getDifferenceData } from '../helpers.js'
import type { DirectoryProvider } from '../directory.js'
import type { Logger } from '../logger.js'
import type { Steno } from '../types.js'
import type { SyncWriter } from './adapter.js'

export class NodeAdapter<T extends unknown> {
  // #adapter: Steno.NodeAdapter<T>
  #adapter: SyncWriter<T>
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
    adapter
  }: Steno.NodeAdapterOptions<T>) {
    if (!entity) {
      throw new EntityError()
    }

    const file = directory.databaseFilePath(name)
    directory.removeFile(file)

    this.#name = name
    this.#directory = directory
    this.#adapter = adapter
    this.#entity = entity
    this.#logger = logger.createLogger(name)
  }

  read(): T {
    this.data = this.#adapter.read()

    if (!this.data && this.initialData) {
      this.#logger.info(
        `Initializing database: ${this.#directory.databaseFilePath(
          this.#name
        )}`,
        this.initialData
      )
      this.data = this.initialData
      this.#adapter.write(this.data)
    }

    this.data = plainToClass(this.#entity, this.data)
    return this.data
  }

  write(): void {
    const diffData = getDifferenceData(this.data, this.#adapter.read())
    const databasePath = this.#directory.databaseFilePath(this.#name)
    this.#logger.info(
      `Writing database: ${databasePath}`,
      diffData ?? 'No changes'
    )
    this.#adapter.write(this.data)
  }

  reset(): void {
    if (this.initialData) {
      this.#adapter.reset(this.initialData)
      this.#logger.info(
        `Resetting database: ${this.#directory.databaseFilePath(this.#name)}`,
        this.initialData
      )
      this.data = this.initialData
      this.write()
    }
  }

  exists(): boolean {
    return this.#adapter.exists()
  }
}
