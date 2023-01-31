import { Type } from 'class-transformer'

export class Users {
  @Type(() => User)
  users: User[]
}

export class User {
  username: string

  @Type(() => Post)
  posts: Post[]

  constructor(username: string, ...posts: Post[]) {
    this.username = username
    this.posts = posts
  }

  addPost(post: Post) {
    this.posts.push(post)
  }
}

export class Post {
  title: string

  constructor(title: string) {
    this.title = title
  }

  changeTitle(title: string) {
    this.title = title
  }
}
