import { Post } from '../../dto/posts.dto.js'
import { User } from '../../dto/users.dto.js'
import {
  userIdAndPostIdParamsSchema,
  userIdParamsSchema
} from './posts.schema.js'
import type { UserService } from '../users/users.service.js'
import type { FastifyInstance } from 'fastify'

export function postsController(
  fastify: FastifyInstance,
  service: UserService
): void {
  fastify.get('/', () => {
    return service.userPosts
  })

  fastify.get<{ Params: { userId: number } }>(
    '/:userId',
    { schema: userIdParamsSchema },
    (request, reply) => {
      const user = service.findUserById(request.params.userId)
      if (!user) return reply.status(404).send('User not found')
      return user.posts
    }
  )

  fastify.get<{ Params: { userId: number; postId: number } }>(
    '/:userId/:postId',
    { schema: userIdAndPostIdParamsSchema },
    (request, reply) => {
      const { userId, postId } = request.params
      const user = service.findUserById(userId)
      if (!user) return reply.status(404).send('User not found')

      const post = user.findPost(postId)
      if (!post) return reply.status(404).send('Post not found')
      return post
    }
  )

  fastify.post<{ Body: Post; Params: User }>(
    '/:userId',
    { schema: userIdParamsSchema },
    async (request, reply) => {
      const user = service.findUserById(request.params.userId)
      if (!user) return reply.status(404).send('User not found')

      const post = new Post(
        user.postsLastId + 1,
        request.body.subject,
        new Date()
      )
      user.addPost(post)
      await service.write()
      return post
    }
  )
}
