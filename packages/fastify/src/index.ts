import { AsyncAdapter, Steno, SyncAdapter } from '@stenodb/node'
import fp from 'fastify-plugin'
import { StenoPlugin } from './plugin.js'
import type { StenoOptions } from './types.js'

const FastifySteno = fp(StenoPlugin.createInstance, {
  name: '@stenodb/fastify',
  fastify: '4.x'
})

export { FastifySteno, AsyncAdapter, SyncAdapter }
export type { StenoOptions, Steno }
export default StenoPlugin.createInstance
