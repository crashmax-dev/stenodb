import { AsyncAdapter, NodeProvider, SyncAdapter } from '@stenodb/node'
import { targetConstructorToSchema } from 'class-validator-jsonschema'
import type { StenoOptions } from './types'
import type { Steno } from '@stenodb/node'
import type { FastifyInstance } from 'fastify'

export class StenoPlugin {
  #fastify: FastifyInstance
  #options: StenoOptions
  #provider: NodeProvider
  #databases: Map<string, Steno.NodeProvider<any>>

  constructor(fastify: FastifyInstance, options: StenoOptions) {
    this.#fastify = fastify
    this.#options = options
    this.#provider = new NodeProvider(options)
    this.#databases = new Map<string, Steno.NodeProvider<any>>()
    this.#fastify.decorate('steno', { get: this.getDatabase.bind(this) })
  }

  static async createInstance(
    fastify: FastifyInstance,
    options: StenoOptions,
    done: () => void
  ): Promise<StenoPlugin> {
    const db = new StenoPlugin(fastify, options)
    await db.registerDatabases()
    done()
    return db
  }

  async registerDatabases(): Promise<void> {
    this.registerEntities()

    for (const adapter of this.#options.adapters) {
      const db = await this.#provider.create(adapter)

      if (adapter instanceof SyncAdapter) {
        db.read()
      } else if (adapter instanceof AsyncAdapter) {
        await db.read()
      } else {
        throw new TypeError('Invalid adapter')
      }

      this.addSchema(adapter.entity)
      this.#databases.set(adapter.fileName, db)
    }
  }

  private registerEntities() {
    if (!this.#options.entities) return
    for (const entity of this.#options.entities) {
      this.addSchema(entity)
    }
  }

  private addSchema(entity: Steno.Entity<any>): void {
    if (this.#fastify.getSchema(entity.name)) return
    const schema = targetConstructorToSchema(
      entity,
      this.#options.entityOptions
    )
    this.#fastify.addSchema({ ...schema, $id: entity.name })
  }

  private getDatabase<T>(name: string): Steno.NodeProvider<T> | undefined {
    return this.#databases.get(name)
  }
}
