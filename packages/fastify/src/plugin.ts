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

  constructor(
    fastify: FastifyInstance,
    options: StenoOptions,
    next: () => void
  ) {
    this.#fastify = fastify
    this.#options = options
    this.#provider = new NodeProvider(options)

    this.#fastify.decorate('steno', {})
    this.registerSchemas()

    next()
  }

  static createInstance(
    fastify: FastifyInstance,
    options: StenoOptions,
    next: () => void
  ): StenoPlugin {
    return new StenoPlugin(fastify, options, next)
  }

  private registerSchemas(options?: IOptions): void {
    for (const entity of this.#options.entities) {
      const schema = targetConstructorToSchema(entity, options)
      this.#fastify.addSchema({ ...schema, $id: entity.name })
    }
  }
}
