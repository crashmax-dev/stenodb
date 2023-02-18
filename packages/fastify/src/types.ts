import type { NodeProvider, Steno } from '@stenodb/node'

declare module 'fastify' {
  export interface FastifyInstance {
    steno: {
      create: <T>(
        name: string,
        entity: Steno.Entity<T>,
        initialData?: T
      ) => Promise<void>
      get: <T>(name: string) => Steno.NodeProvider<T> | undefined
    }
  }
}
