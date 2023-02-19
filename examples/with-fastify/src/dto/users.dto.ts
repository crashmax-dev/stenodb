import { AsyncAdapter } from '@stenodb/fastify'
import { Exclude, Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, Length } from 'class-validator'

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

export class Post {
  @Exclude({ toPlainOnly: true })
  @IsNumber()
  postId: number

  @IsString()
  @Length(1, 128)
  subject: string

  @Exclude({ toPlainOnly: true })
  @Type(() => Date)
  createdAt: Date

  constructor(postId: number, subject: string, createdAt: Date) {
    this.postId = postId
    this.subject = subject
    this.createdAt = createdAt
  }
}

const initialData = new Users(
  new User(1, 'john', 18, new Post(1, 'Lorem ipsum', new Date())),
  new User(2, 'alice', 23)
)

export const userEntities = [User, Post]

export const users = new AsyncAdapter('users', Users, initialData)
