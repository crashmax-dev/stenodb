import { Writer } from 'steno'
import { DirectoryProvider } from '../DirectoryProvider.js'
import type { Entity } from '../types.js'

export class BaseWriter<T> {
  path: string
  entity: Entity<T>
  file: string
  writer: Writer
  directory: DirectoryProvider

  constructor(path: string, entity: Entity<T>) {
    this.entity = entity
    this.directory = new DirectoryProvider(path)
    this.writer = new Writer(this.directory.path)
  }
}
