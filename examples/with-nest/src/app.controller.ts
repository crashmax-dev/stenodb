import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UsersService } from './app.service'
import { CreateUserDto } from './dto/users.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.users
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(Number(id)) ?? {}
  }

  @Post()
  async addUser(@Body() user: CreateUserDto) {
    await this.usersService.add(user)
  }

  @Post('reset')
  async resetUsers() {
    await this.usersService.reset()
  }

  @Post('remove/:id')
  async removeUser(@Param('id') id: string) {
    await this.usersService.remove(Number(id))
  }
}
