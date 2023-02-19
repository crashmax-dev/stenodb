import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FastifySteno } from '@stenodb/fastify'
import Fastify from 'fastify'
import { Post, User, Users } from './entities.js'

const fastify = Fastify()

fastify.register(FastifySteno, {
  path: resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db'),
  entities: [User, Post]
})

fastify.post('/', { schema: { body: { $ref: 'User' } } }, (req) => {
  return {
    body: req.body,
    schema: req.routeSchema
  }
})

fastify.listen({ host: '0.0.0.0', port: 3000 }, async (err, address) => {
  if (err) throw err
  console.log(address)
})
