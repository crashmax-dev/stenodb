import { Type } from 'class-transformer'

export class Users {
  @Type(() => User)
  users: User[] = []

  constructor(...users: User[]) {
    this.users = users
  }
}

export class User {
  id: number
  name: string
  age: number

  constructor(id: number, name: string, age: number) {
    this.id = id
    this.name = name
    this.age = age
  }
}
