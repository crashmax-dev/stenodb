import { readFile, readFileSync } from 'node:fs'
import { readFile as readFileAsync } from 'node:fs/promises'
import { Writer } from 'steno'
import { parseData } from './helpers.js'
import type { DirectoryProvider } from './directory.js'
import type { Steno } from './types.js'

export class StenoWriterSync<T> implements Steno.SyncWriter<T> {
  #filename: string
  #path: string
  #directory: DirectoryProvider
  #writer: Writer
  #data: T | null = null

  constructor(filename: string, directory: DirectoryProvider) {
    this.#filename = filename
    this.#path = directory.databaseFilePath(this.#filename)
    this.#directory = directory
    this.#writer = new Writer(this.#path)
  }

  read(): T | null {
    try {
      const file = readFileSync(this.#path, 'utf-8')
      this.#data = parseData<T>(file).toJSON()
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return null
      }

      throw err
    }

    return this.#data
  }

  write(data: T | null): void {
    this.#data = data
    this.#writer.write(parseData(data).toString())
  }

  reset(initialData: T): void {
    readFile(this.#path, (err, buffer) => {
      if (err) throw err
      this.#directory.createTempFile(this.#filename, parseData(buffer).toJSON())
    })

    this.write(initialData)
  }

  exists(): boolean {
    return this.read() !== null
  }
}

export class StenoWriter<T> implements Steno.AsyncWriter<T> {
  #filename: string
  #path: string
  #directory: DirectoryProvider
  #writer: Writer
  #data: T | null = null

  constructor(filename: string, directory: DirectoryProvider) {
    this.#filename = filename
    this.#path = directory.databaseFilePath(this.#filename)
    this.#directory = directory
    this.#writer = new Writer(this.#path)
  }

  async read(): Promise<T | null> {
    try {
      const file = await readFileAsync(this.#filename, 'utf-8')
      this.#data = JSON.parse(file) as T
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return null
      }

      throw err
    }

    return this.#data
  }

  async write(data: T | null): Promise<void> {
    this.#data = data
    return this.#writer.write(parseData(data).toString())
  }

  async reset(initialData: T): Promise<void> {
    try {
      const data = await readFileAsync(this.#path)
      this.#directory.createTempFile(this.#filename, data)
      return this.write(initialData)
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return this.write(initialData)
      }

      throw err
    }
  }

  async exists(): Promise<boolean> {
    return (await this.read()) !== null
  }
}
