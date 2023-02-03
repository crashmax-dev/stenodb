import { readFile } from 'node:fs/promises'
import { parseData } from '@stenodb/utils'
import { Entity } from '../types.js'
import { BaseWriter } from './BaseWriter.js'

interface AsyncAdapter<T> {
  read(): Promise<T | null>
  write(data: T | null): Promise<void>
  reset(initialData: T): Promise<void>
  exists(): Promise<boolean>
}

export class AsyncWriter<T> extends BaseWriter<T> implements AsyncAdapter<T> {
  constructor(name: string, entity: Entity<T>) {
    super(name, entity)
  }

  async read(): Promise<T | null> {
    try {
      const data = await readFile(this.path, 'utf-8')
      return parseData<T>(data).toJSON()
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return null
      }

      throw err
    }
  }

  async write(data: T | null): Promise<void> {
    await this.writer.write(parseData(data).toString())
  }

  async reset(initialData: T): Promise<void> {
    try {
      const data = await readFile(this.path, 'utf-8')
      await this.directory.createTempFile(data).writeAsync()
      await this.write(initialData)
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        this.write(initialData)
      }

      throw err
    }
  }

  async exists(): Promise<boolean> {
    return (await this.read()) !== null
  }
}
