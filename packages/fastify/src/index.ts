import { AsyncAdapter, NodeProvider } from '@stenodb/node'
import fp from 'fastify-plugin'
import type { Steno } from '@stenodb/node'
import type { FastifyInstance } from 'fastify'
import './types.js'

function fastifyPlugin(
  fastify: FastifyInstance,
  options: Steno.NodeProviderOptions,
  next: () => void
) {
  const database = new Map<string, Steno.NodeProvider<unknown>>()
  const provider = new NodeProvider(options)

  async function createDatabase<T>(
    name: string,
    entity: Steno.Entity<T>,
    initialData?: T
  ): Promise<void> {
    const adapter = new AsyncAdapter(name, entity, initialData)
    const db = await provider.create(adapter)
    await db.read()
    database.set(name, db)
  }

  function getDatabase<T>(name: string): Steno.NodeProvider<T> | undefined {
    return database.get(name) as Steno.NodeProvider<T>
  }

  fastify.decorate('steno', {
    create: createDatabase,
    get: getDatabase
  })

  next()
}

const FastifySteno = fp(fastifyPlugin, {
  name: '@stenodb/fastify',
  fastify: '4.x'
})

export { FastifySteno }
export default fastifyPlugin
