import { readFile } from 'node:fs/promises'
import { parseData } from '@stenodb/utils'
import { BaseAdapter } from './BaseAdapter.js'
import type { Steno } from '../types.js'

export class AsyncAdapter<T> extends BaseAdapter<T> {
  constructor(fileName: string, entity: Steno.Entity<T>, initialData?: T) {
    super(fileName, entity, initialData)
  }

  async read(): Promise<void> {
    try {
      const file = await readFile(this.filePath, 'utf-8')
      this.data = this.plainData(file)
    } catch (err) {
      console.log(err)
    }
  }

  async write(): Promise<void> {
    await this.writer.write(parseData(this.data).toString())
  }

  async reset(): Promise<void> {
    if (!this.initialData) return

    try {
      await this.directory
        .createTemporaryFile(this.fileName, this.data)
        ?.writeAsync()
      this.data = this.initialData
      await this.write()
    } catch (err) {
      console.log(err)
    }
  }

  async exists(): Promise<boolean> {
    return (await this.read()) !== null
  }
}
