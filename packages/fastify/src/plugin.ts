import { NodeProvider } from '@stenodb/node'
import { targetConstructorToSchema } from 'class-validator-jsonschema'
import type { Steno } from '@stenodb/node'
import type { IOptions } from 'class-validator-jsonschema/build/options'
import type { FastifyInstance } from 'fastify'

export interface StenoOptions extends Steno.NodeProviderOptions {
  entities: Steno.Entity<any>[]
}

export class StenoPlugin {
  #fastify: FastifyInstance
  #options: StenoOptions
  #provider: NodeProvider

  constructor(fastify: FastifyInstance, options: StenoOptions, done: () => void) {
    this.#fastify = fastify
    this.#options = options
    this.#provider = new NodeProvider(options)

    this.#fastify.decorate('steno', {})
    this.registerSchemas()

    done()
  }

  static async createInstance(
    fastify: FastifyInstance,
    options: StenoOptions,
    done: () => void
  ): Promise<StenoPlugin> {
    return new StenoPlugin(fastify, options, done)
  }

  private registerSchemas(options?: IOptions): void {
    for (const entity of this.#options.entities) {
      const schema = targetConstructorToSchema(entity, options)
      this.#fastify.addSchema({ ...schema, $id: entity.name })
    }
  }
}
