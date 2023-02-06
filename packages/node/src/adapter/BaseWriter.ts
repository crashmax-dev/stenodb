import { Writer } from 'steno'
import type { DirectoryProvider } from '../DirectoryProvider.js'
import type { Entity } from '../types.js'

export class BaseWriter<T> {
  name: string
  entity: Entity<T>

  file: string
  directory: DirectoryProvider
  writer: Writer

  constructor(name: string, entity: Entity<T>) {
    this.name = name
    this.entity = entity
  }

  setDirectory(directory: DirectoryProvider): void {
    this.directory = directory
    this.file = this.directory.databaseFilePath(this.name)
    this.writer = new Writer(this.file)
  }
}
