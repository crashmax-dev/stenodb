import { LowBaseEntity } from '../src/index.js'

interface UserData {
  username: string
  posts: Post[]
}

export class User extends LowBaseEntity {
  readonly tableName: string

  username: string
  posts: Post[] = []

  constructor({ username, posts }: UserData) {
    super('users')
    this.username = username
    this.posts = posts
  }

  addPost(post: Post) {
    this.posts.push(post)
  }
}

interface PostData {
  title: string
}

export class Post extends LowBaseEntity {
  title: string

  constructor({ title }: PostData) {
    super('users')
    this.title = title
  }
}
