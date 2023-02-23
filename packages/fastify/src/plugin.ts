import { AsyncAdapter, NodeProvider } from '@stenodb/node'
import { targetConstructorToSchema } from 'class-validator-jsonschema'
import type { StenoOptions } from './types'
import type { AsyncProvider } from '@stenodb/node'
import type { ClassEntity } from '@stenodb/utils'
import type { FastifyInstance } from 'fastify'

export class StenoPlugin {
  #fastify: FastifyInstance
  #options: StenoOptions
  #db: NodeProvider
  #providers: Map<string, AsyncProvider<any>>

  constructor(fastify: FastifyInstance, options: StenoOptions) {
    this.#fastify = fastify
    this.#options = options
    this.#db = new NodeProvider(options)
    this.#providers = new Map<string, AsyncProvider<any>>()
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
      let provider: AsyncProvider<any>

      if (adapter instanceof AsyncAdapter) {
        provider = await this.#db.create(adapter)
        await provider.read()
      } else {
        throw new TypeError('Invalid adapter')
      }

      this.addSchema(adapter.entity)
      this.#providers.set(adapter.fileName, provider)
    }
  }

  private registerEntities(): void {
    if (!this.#options.entities) return
    for (const entity of this.#options.entities) {
      this.addSchema(entity)
    }
  }

  private addSchema(entity: ClassEntity<any>): void {
    if (this.#fastify.getSchema(entity.name)) return
    const schema = targetConstructorToSchema(
      entity,
      this.#options.entityOptions
    )
    if (!schema.properties) return
    this.#fastify.addSchema({ ...schema, $id: entity.name })
  }

  private getDatabase<T extends ClassEntity<any>>(
    name: string
  ): AsyncProvider<T> | undefined {
    return this.#providers.get(name)
  }
}
