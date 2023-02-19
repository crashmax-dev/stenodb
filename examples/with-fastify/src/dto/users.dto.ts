import { Exclude, Type } from 'class-transformer'
import { IsNumber, IsString, Length } from 'class-validator'
import { Post } from './posts.dto.js'

export class Users {
  @Type(() => User)
  users: User[]

  constructor(...users: User[]) {
    this.users = users
  }
}

export class User {
  @Exclude({ toPlainOnly: true })
  @IsNumber()
  userId: number

  @IsString()
  @Length(3, 20)
  username: string

  @IsNumber()
  age: number

  @Exclude({ toPlainOnly: true })
  @Type(() => Post)
  posts: Post[]

  constructor(userId: number, username: string, age: number, ...posts: Post[]) {
    this.userId = userId
    this.username = username
    this.age = age
    this.posts = posts
  }

  findPost(postId: number): Post | undefined {
    return this.posts.find((post) => post.postId === postId)
  }

  addPost(post: Post) {
    this.posts.push(post)
  }

  get postsLastId(): number {
    return this.posts.at(-1)!.postId
  }
}
