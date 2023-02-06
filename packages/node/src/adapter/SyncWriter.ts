import { readFileSync } from 'node:fs'
import { parseData } from '@stenodb/utils'
import { BaseWriter } from './BaseWriter.js'
import type { Entity } from '../types.js'

interface SyncAdapter<T> {
  read(): T | null
  write(data: T | null): void
  reset(initialData: T): void
  exists(): boolean
}

export class SyncWriter<T> extends BaseWriter<T> implements SyncAdapter<T> {
  constructor(name: string, entity: Entity<T>) {
    super(name, entity)
  }

  read(): T | null {
    try {
      const data = readFileSync(this.file, 'utf-8')
      return parseData<T>(data).toJSON()
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return null
      }

      throw err
    }
  }

  write(data: T | null): void {
    this.writer.write(parseData(data).toString())
  }

  reset(initialData: T): void {
    try {
      const data = this.read()
      this.directory.createTemporaryFile(this.name, data).write()
      this.write(initialData)
    } catch (err) {
      throw err
    }
  }

  exists(): boolean {
    return this.read() !== null
  }
}
