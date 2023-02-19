import type { Steno } from '@stenodb/node'

declare module 'fastify' {
  export interface FastifyInstance {
    steno: {
      get: <T>(name: string) => Steno.NodeProvider<T> | undefined
    }
  }
}
