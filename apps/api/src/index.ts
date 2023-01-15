import Fastify from 'fastify'
import { PrismaClient } from '@node-esm/prisma'
import { server } from './config.js'

const fastify = Fastify()
const prisma = new PrismaClient()
await prisma.$connect()

fastify
  .listen(server)
  .then(() => console.log(`Fastify (${fastify.version}): ${server.href}`))
  .catch(console.log)

function onClose() {
  fastify.close()
  prisma.$disconnect()
}

process.on('SIGTERM', onClose)
process.on('SIGINT', onClose)
