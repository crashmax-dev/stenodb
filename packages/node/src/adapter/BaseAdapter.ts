import { parseData } from '@stenodb/utils'
import { plainToClass } from 'class-transformer'
import { Writer } from 'steno'
import type { DirectoryProvider } from '../provider/DirectoryProvider.js'
import type { Steno } from '../types.js'

export class BaseAdapter<T> {
  fileName: string
  entity: Steno.Entity<T>

  directory: DirectoryProvider
  filePath: string
  writer: Writer

  data: T | null = null
  initialData: T | null = null

  constructor(fileName: string, entity: Steno.Entity<T>, initialData?: T) {
    this.fileName = fileName
    this.entity = entity

    if (initialData) {
      this.initialData = initialData
    }
  }

  plainData(data: T | string | null = this.data): T | null {
    if (!data) return null

    const parsedData =
      typeof data === 'string' ? parseData<T>(data).toJSON() : data

    return plainToClass(this.entity, parsedData)
  }

  registerDirectory(directory: DirectoryProvider): void {
    this.directory = directory
    this.filePath = this.directory.databaseFilePath(this.fileName)
    this.writer = new Writer(this.filePath)
  }
}
