import { User } from '../../dto/users.dto.js'
import { userIdParamsSchema } from '../posts/posts.schema.js'
import { userBodySchema, userResponseSchema } from './users.schema.js'
import type { UserService } from './users.service.js'
import type { FastifyInstance } from 'fastify'

export function userController(
  fastify: FastifyInstance,
  service: UserService
): void {
  fastify.get('/', () => {
    return service.users
  })

  fastify.get<{ Params: User }>(
    '/:userId',
    {
      schema: userIdParamsSchema
    },
    (request, reply) => {
      const user = service.findUserById(request.params.userId)
      if (!user) return reply.status(404).send('User not found')

      return {
        id: user.userId,
        username: user.username,
        age: user.age
      }
    }
  )

  fastify.post<{ Body: User }>(
    '/',
    { schema: userBodySchema },
    async (request, reply) => {
      const { username, age } = request.body
      const newUser = await service.addUser(username, age)
      if (!newUser) return reply.status(400).send('Username exist')
      return newUser
    }
  )

  fastify.delete<{ Params: User }>(
    '/:userId',
    { schema: userResponseSchema },
    async (request, reply) => {
      const user = await service.deleteUser(request.params.userId)
      if (!user) return reply.status(404).send('User not found')
      return user
    }
  )
}
