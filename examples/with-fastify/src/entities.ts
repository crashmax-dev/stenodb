import { Exclude, Type } from 'class-transformer'
import { IsNumber, IsString, Length, MaxLength } from 'class-validator'

export class Users {
  @Type(() => User)
  users: User[]

  constructor(...users: User[]) {
    this.users = users
  }
}

export class User {
  @IsString()
  @Length(3, 20)
  username: string

  @IsNumber()
  age: number

  @Exclude()
  @Type(() => Post)
  posts: Post[]

  constructor(username: string, age: number, ...posts: Post[]) {
    this.username = username
    this.age = age
    this.posts = posts
  }

  addPost(post: Post) {
    this.posts.push(post)
  }
}

export class Post {
  @IsString()
  @MaxLength(128)
  title: string

  constructor(title: string) {
    this.title = title
  }

  changeTitle(title: string) {
    this.title = title
  }
}
