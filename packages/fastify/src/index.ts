import fp from 'fastify-plugin'
import { StenoPlugin } from './plugin.js'

const FastifySteno = fp(StenoPlugin.createInstance, {
  name: '@stenodb/fastify',
  fastify: '4.x'
})

export { FastifySteno }
export default StenoPlugin.createInstance
