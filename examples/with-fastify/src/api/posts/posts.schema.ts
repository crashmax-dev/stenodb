export const userIdParamsSchema = {
  params: {
    userId: {
      $ref: 'User#/properties/userId'
    }
  }
}

export const userIdAndPostIdParamsSchema = {
  params: {
    userId: {
      $ref: 'User#/properties/userId'
    },
    postId: {
      $ref: 'Post#/properties/postId'
    }
  }
}
