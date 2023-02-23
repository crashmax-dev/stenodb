import 'reflect-metadata'
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
  name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  changeName(name: string): void {
    this.name = name
  }
}
