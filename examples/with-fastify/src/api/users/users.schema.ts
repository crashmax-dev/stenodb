export const userBodySchema = {
  body: { $ref: 'User' }
}

export const userResponseSchema = {
  response: {
    200: { $ref: 'User' }
  }
}
