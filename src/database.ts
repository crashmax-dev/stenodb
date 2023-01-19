import { Low } from 'lowdb'
import { LowDirectoryProvider } from './directory.js'
import type { JSONFile } from 'lowdb/node'

export class LowDatabase<T extends unknown> extends Low<T> {
  constructor(
    adapter: JSONFile<T>,
    private readonly filename: string,
    private readonly directoryProvider: LowDirectoryProvider,
    private readonly initialData?: T
  ) {
    super(adapter)
  }

  async writeData(data: T): Promise<void> {
    this.data = data
    await this.write()
  }

  async resetData(): Promise<void> {
    if (this.initialData) {
      this.directoryProvider.createTempFile(this.filename)
      await this.writeData(this.initialData)
    }
  }
}
