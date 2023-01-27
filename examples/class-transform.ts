import 'reflect-metadata'
import { plainToClass, Type } from 'class-transformer'
import { Length, validate } from 'class-validator'

class Users {
  @Type(() => User)
  private readonly users: User[]

  addUser(user: User) {
    this.users.push(user)
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id)
  }
}

class User {
  id: number

  @Length(1, 12)
  username: string

  constructor(id: number, username: string) {
    this.id = id
    this.username = username
  }

  changeUsername(username: string) {
    this.username = username
  }
}

const usersDb = {
  users: [
    {
      id: 1,
      username: 'John Doe'
    },
    {
      id: 2,
      username: 'Di Bi Kuper 111111111111'
    }
  ]
}

async function bootstrap() {
  const users = plainToClass(Users, usersDb)
  const newUser = new User(3, '12345678999')
  const validateNewUser = await validate(newUser)
  if (validateNewUser.length) {
    console.log(validateNewUser)
    return
  }

  users.addUser(newUser)
  console.log(users)
}

bootstrap()
