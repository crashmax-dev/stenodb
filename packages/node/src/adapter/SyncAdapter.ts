import { readFileSync } from 'node:fs'
import { BaseAdapter } from './BaseAdapter.js'
import type { Steno } from '../types.js'

export class SyncAdapter<T> extends BaseAdapter<T> {
  constructor(fileName: string, entity: Steno.Entity<T>, initialData?: T) {
    super(fileName, entity, initialData)
  }

  read(): void {
    try {
      const file = readFileSync(this.filePath, 'utf-8')
      this.data = this.dataTransformer.toJSON(file)
      this.logger.info('Read data from file', this.data)
    } catch (err) {
      if (!this.data) {
        this.reset()
      }

      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        this.logger.error('Failed to read data from file', err)
      }
    }
  }

  write(): void {
    this.writer.write(this.dataTransformer.toString(this.data))
    this.logger.info('Write data to file', this.data)
  }

  reset(): void {
    if (!this.initialData) {
      this.logger.warn('No initial data to reset to')
      return
    }

    try {
      this.directory
        .createTemporaryFile(
          this.fileName,
          this.dataTransformer.toString(this.data)
        )
        ?.write()
      this.data = this.dataTransformer.toJSON(this.initialData)
      this.write()
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        this.logger.error('Failed to read data from file', err)
      }
    }
  }

  exists(): boolean {
    return this.read() !== null
  }
}
