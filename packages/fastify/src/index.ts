import { AsyncAdapter, AsyncProvider } from '@stenodb/node'
import fp from 'fastify-plugin'
import { StenoPlugin } from './plugin.js'
import type { StenoOptions } from './types.js'
import type { ClassEntity } from '@stenodb/utils'

const FastifySteno = fp(StenoPlugin.createInstance, {
  name: '@stenodb/fastify',
  fastify: '4.x'
})

export { FastifySteno, AsyncAdapter, AsyncProvider }
export type { StenoOptions, ClassEntity }
export default StenoPlugin.createInstance
