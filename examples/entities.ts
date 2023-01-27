import { LowEntity } from '../src/index.js'

interface UserData {
  username: string
  posts?: Post[]
}

export class User extends LowEntity.Base {
  static readonly [LowEntity.Name] = 'users'

  username: string
  posts: Post[]
  status: string

  constructor({ username, posts }: UserData) {
    super()
    this.username = username
    this.status = 'offline'
    this.posts = posts ?? []
  }

  addPost(post: Post) {
    this.posts.push(post)
  }
}

interface PostData {
  title: string
}

export class Post extends LowEntity.Base {
  static readonly [LowEntity.Name] = 'posts'

  title: string

  constructor({ title }: PostData) {
    super()
    this.title = title
  }
}
