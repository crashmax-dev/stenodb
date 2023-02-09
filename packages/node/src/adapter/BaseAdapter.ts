import { BaseLogger } from '@stenodb/logger'
import { dataTransformer, entityTransformer } from '@stenodb/utils'
import { Writer } from '@stenodb/writer'
import type { DirectoryProvider } from '../provider/DirectoryProvider.js'
import type { Steno } from '../types.js'
import type { DataTransformer, EntityTransformer } from '@stenodb/utils'

export class BaseAdapter<T> {
  fileName: string
  filePath: string

  entityTransformer: EntityTransformer<T>
  dataTransformer: DataTransformer<T>

  directory: DirectoryProvider
  logger: BaseLogger | undefined
  writer: Writer

  data: T | null = null
  initialData: T | null = null

  constructor(fileName: string, entity: Steno.Entity<T>, initialData?: T) {
    this.fileName = fileName
    this.entityTransformer = entityTransformer(entity)
    this.dataTransformer = dataTransformer(this.entityTransformer)

    if (initialData) {
      this.initialData = initialData
    }
  }

  registerLogger(logger: BaseLogger): void {
    this.logger = logger
  }

  registerDirectory(directory: DirectoryProvider): void {
    this.directory = directory
    this.filePath = this.directory.databaseFilePath(this.fileName)
    this.writer = new Writer(this.filePath)
  }
}
