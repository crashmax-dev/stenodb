import { Low } from 'lowdb'
import type { JSONFile } from 'lowdb/node'

export class Database<T extends unknown> extends Low<T> {
  constructor(adapter: JSONFile<T>, private readonly initialData?: T) {
    super(adapter)
  }

  async writeData(data: T): Promise<void> {
    this.data = data
    await this.write()
  }

  async resetData(): Promise<void> {
    if (this.initialData) {
      await this.writeData(this.initialData)
    }
  }
}
