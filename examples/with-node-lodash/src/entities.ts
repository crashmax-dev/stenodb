import { Type } from 'class-transformer'

export class Users {
  @Type(() => User)
  users: User[]

  constructor(...users: User[]) {
    this.users = users
  }
}

export class User {
  id: number
  username: string

  constructor(id: number, username: string) {
    this.id = id
    this.username = username
  }
}
