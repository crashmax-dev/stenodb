import { LowBaseEntity } from '../src/index.js'

interface UserData {
  username: string
  posts?: Post[]
}

export class User extends LowBaseEntity {
  readonly tableName = 'users'

  username: string
  posts: Post[]

  constructor({ username, posts }: UserData) {
    super()
    this.username = username
    this.posts = posts ?? []
  }

  addPost(post: Post) {
    this.posts.push(post)
  }
}

interface PostData {
  title: string
}

export class Post extends LowBaseEntity {
  readonly tableName = 'users'

  title: string

  constructor({ title }: PostData) {
    super()
    this.title = title
  }
}
