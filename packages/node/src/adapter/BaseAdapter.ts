import { extname } from 'node:path'
import { BaseLogger } from '@stenodb/logger'
import { dataTransformer, entityTransformer } from '@stenodb/utils'
import { Writer } from '@stenodb/writer'
import type { DirectoryProvider } from '../provider/DirectoryProvider.js'
import type { ClassEntity } from '@stenodb/utils'
import type { DataTransformer, EntityTransformer } from '@stenodb/utils'

export class BaseAdapter<T> {
  fileName: string
  filePath: string

  entity: ClassEntity<T>
  entityTransformer: EntityTransformer<T>
  dataTransformer: DataTransformer<T>

  directory: DirectoryProvider
  logger: BaseLogger | undefined
  writer: Writer

  data: T | null = null
  initialData: T | null = null

  constructor(fileName: string, entity: ClassEntity<T>, initialData?: T) {
    if (extname(fileName) !== '') {
      throw new Error(`File name must have an extension: ${fileName}`)
    }

    this.fileName = fileName
    this.entity = entity
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
