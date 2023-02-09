import { Injectable, OnModuleInit } from '@nestjs/common'
import { Steno, StenoService } from '@stenodb/nest'
import { initialUsersData } from './constants'
import { User, Users } from './entities/users'

@Injectable()
export class UsersService implements OnModuleInit {
  private usersProvider: Steno.NodeProvider<Users>

  constructor(private readonly stenoService: StenoService) {}

  async onModuleInit(): Promise<void> {
    this.usersProvider = await this.stenoService.createAsync(
      'users',
      Users,
      initialUsersData
    )
  }

  getUsers(): User[] {
    return this.usersProvider.data.users
  }
}
