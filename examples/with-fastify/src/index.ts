import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncAdapter, FastifySteno } from '@stenodb/fastify'
import Fastify from 'fastify'
import { postsController } from './api/posts/posts.controller.js'
import { userController } from './api/users/users.controller.js'
import { UserService } from './api/users/users.service.js'
import { Post } from './dto/posts.dto.js'
import { User, Users } from './dto/users.dto.js'

const fastify = Fastify()

const usersInitialData = new Users(
  new User(1, 'john', 18, new Post(1, 'Lorem ipsum', new Date())),
  new User(2, 'alice', 23)
)

const usersAdapter = new AsyncAdapter(
  'users',
  Users,
  usersInitialData
)

fastify.register(FastifySteno, {
  path: resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db'),
  entities: [User, Post],
  adapters: [usersAdapter]
})

fastify.register(
  (instance, _, done) => {
    const userService = new UserService(fastify)

    instance.register(
      (instance, _, done) => {
        userController(instance, userService)
        done()
      },
      { prefix: '/users' }
    )

    instance.register(
      (instance, _, done) => {
        postsController(instance, userService)
        done()
      },
      { prefix: '/posts' }
    )

    done()
  },
  { prefix: '/api' }
)

fastify.get('/schemas', () => {
  return fastify.getSchemas()
})

fastify.listen({ host: '0.0.0.0', port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(address)
})
