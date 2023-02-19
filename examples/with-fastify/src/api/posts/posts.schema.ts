export const userIdParamsSchema = {
  params: {
    userId: {
      $ref: 'User#/properties/userId'
    }
  }
}

export const userIdAndPostIdParamsSchema = {
  params: {
    ...userIdParamsSchema.params,
    postId: {
      $ref: 'Post#/properties/postId'
    }
  }
}
