import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FastifySteno } from '@stenodb/fastify'
import Fastify from 'fastify'
import { Post, User, Users } from './entities.js'

const fastify = Fastify()
const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db')

fastify.register(FastifySteno, { path })

fastify.get('/', async (req, rep) => {
  const users = fastify.steno.get<Users>('users')
  return users?.data
})

fastify.listen({ host: '0.0.0.0', port: 3000 }, async (err, address) => {
  if (err) throw err

  await fastify.steno.create('users', Users, new Users(new User('John')))

  console.log(address)
})
