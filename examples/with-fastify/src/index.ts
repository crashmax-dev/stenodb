import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncAdapter, FastifySteno } from '@stenodb/fastify'
import Fastify from 'fastify'
import { Post, User, Users } from './entities.js'

const fastify = Fastify()

fastify.register(FastifySteno, {
  path: resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db'),
  entities: [User, Post],
  adapters: [new AsyncAdapter('users', Users, new Users(new User('John', 18)))]
})

fastify.get('/', () => {
  const users = fastify.steno.get<Users>('users')!
  return users.data
})

fastify.post<{ Body: User }>(
  '/',
  { schema: { body: { $ref: 'User' } } },
  async (req) => {
    const users = fastify.steno.get<Users>('users')!
    users.data!.users.push(req.body)
    await users.write()
    return users.data
  }
)

fastify.get('/schemas', () => {
  return fastify.getSchemas()
})

fastify.listen({ host: '0.0.0.0', port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(address)
})
