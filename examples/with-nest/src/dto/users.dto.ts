import { Exclude, Type } from 'class-transformer'
import { Length, Max, Min } from 'class-validator'

export class Users {
  @Type(() => CreateUserDto)
  users: CreateUserDto[] = []

  constructor(...users: CreateUserDto[]) {
    this.users = users
  }
}

export class CreateUserDto {
  @Exclude({ toPlainOnly: true })
  id: number

  @Length(1, 20)
  name: string

  @Min(12)
  @Max(100)
  age: number

  constructor(id: number, name: string, age: number) {
    this.id = id
    this.name = name
    this.age = age
  }
}
