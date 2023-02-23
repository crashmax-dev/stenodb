import type {
  AsyncAdapter,
  AsyncProvider,
  NodeProviderOptions
} from '@stenodb/node'
import type { ClassEntity } from '@stenodb/utils'
import type { IOptions } from 'class-validator-jsonschema/build/options'

export interface StenoOptions extends NodeProviderOptions {
  adapters: AsyncAdapter<any>[]
  entities?: ClassEntity<any>[]
  entityOptions?: IOptions
}

declare module 'fastify' {
  export interface FastifyInstance {
    steno: {
      get: <T>(name: string) => AsyncProvider<T> | undefined
    }
  }
}
