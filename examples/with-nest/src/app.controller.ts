import { Controller, Get } from '@nestjs/common'
import { UsersService } from './app.service'
import { User } from './entities/users'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): User[] {
    return this.usersService.getUsers()
  }
}
