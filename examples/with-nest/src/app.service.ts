import { Injectable, OnModuleInit } from '@nestjs/common'
import { Steno, StenoService } from '@stenodb/nest'
import { CreateUserDto, initialUsersData, Users } from './dto/users.dto'

@Injectable()
export class UsersService implements OnModuleInit {
  private usersProvider: Steno.NodeProvider<Users>

  constructor(private readonly stenoService: StenoService) {}

  async onModuleInit(): Promise<void> {
    this.usersProvider = await this.stenoService.create(
      'users',
      Users,
      initialUsersData
    )

    await this.usersProvider.read()
  }

  get users(): CreateUserDto[] {
    return this.usersProvider.data.users
  }

  set users(users: CreateUserDto[]) {
    this.usersProvider.data.users = users
  }

  findById(id: number): CreateUserDto {
    return this.users.find((user) => user.id === id)
  }

  async add(user: CreateUserDto): Promise<void> {
    user.id = this.users.at(-1).id + 1
    this.users.push(user)
    await this.usersProvider.write()
  }

  async remove(id: number): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
    await this.usersProvider.write()
  }
}
