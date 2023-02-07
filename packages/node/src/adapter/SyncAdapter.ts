import { readFileSync } from 'node:fs'
import { parseData } from '@stenodb/utils'
import { BaseAdapter } from './BaseAdapter.js'
import type { Steno } from '../types.js'

export class SyncAdapter<T> extends BaseAdapter<T> {
  constructor(fileName: string, entity: Steno.Entity<T>, initialData?: T) {
    super(fileName, entity, initialData)
  }

  read(): void {
    try {
      const file = readFileSync(this.filePath, 'utf-8')
      this.data = this.plainData(file)
    } catch (err) {
      console.log(err)
    }
  }

  write(): void {
    this.writer.write(parseData(this.data).toString())
  }

  reset(): void {
    if (!this.initialData) return

    try {
      this.directory.createTemporaryFile(this.fileName, this.data)?.write()
      this.data = this.initialData
      this.write()
    } catch (err) {
      throw err
    }
  }

  exists(): boolean {
    return this.read() !== null
  }
}
