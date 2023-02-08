import { readFile } from 'node:fs/promises'
import { BaseAdapter } from './BaseAdapter.js'
import type { Steno } from '../types.js'

export class AsyncAdapter<T> extends BaseAdapter<T> {
  constructor(fileName: string, entity: Steno.Entity<T>, initialData?: T) {
    super(fileName, entity, initialData)
  }

  async read(): Promise<void> {
    try {
      const file = await readFile(this.filePath, 'utf-8')
      this.data = this.dataTransformer.toJSON(file)
      this.logger?.info('Read data from file', this.data)
    } catch (err) {
      if (!this.data) {
        await this.reset()
      }

      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        this.logger?.error('Failed to read data from file', err)
      }
    }
  }

  async write(): Promise<void> {
    await this.writer.write(this.dataTransformer.toString(this.data))
    this.logger?.info('Write data to file', this.data)
  }

  async reset(): Promise<void> {
    if (!this.initialData) {
      this.logger?.warn('No initial data to reset to')
      return
    }

    try {
      await this.directory
        .createTemporaryFile(
          this.fileName,
          this.dataTransformer.toString(this.data)
        )
        ?.writeAsync()
      this.data = this.dataTransformer.toJSON(this.initialData)
      await this.write()
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        this.logger?.error('Failed to read data from file', err)
      }
    }
  }

  async exists(): Promise<boolean> {
    return (await this.read()) !== null
  }
}
