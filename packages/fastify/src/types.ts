import type { Steno } from '@stenodb/node'
import type { IOptions } from 'class-validator-jsonschema/build/options'

export interface StenoOptions extends Steno.NodeProviderOptions {
  adapters: Steno.NodeAdapter<any>[]
  entities?: Steno.Entity<any>[]
  entityOptions?: IOptions
}

declare module 'fastify' {
  export interface FastifyInstance {
    steno: {
      get: <T>(name: string) => Steno.NodeProvider<T> | undefined
    }
  }
}
