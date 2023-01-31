import { Type } from 'class-transformer'

export class Users {
  @Type(() => User)
  users: User[]

  constructor(...users: User[]) {
    this.users = users
  }

  addUser(user: User): void {
    this.users.push(user)
  }

  getLastUserId(): number {
    return this.users!.at(-1)!.id
  }
}

export class User {
  id: number
  username: string

  constructor(id: number, username: string) {
    this.id = id
    this.username = username
  }

  changeUsername(username: string): void {
    this.username = username
  }
}
