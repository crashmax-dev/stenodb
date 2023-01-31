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

  getLastUser(): User {
    return this.users!.at(-1)!
  }
}

export class User {
  id: number
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
}
