import { userIdParamsSchema } from '../posts/posts.schema.js'

export const userBodySchema = {
  body: { $ref: 'User' }
}

export const userResponseSchema = {
  params: {
    ...userIdParamsSchema.params
  },
  response: {
    200: { $ref: 'User' }
  }
}
