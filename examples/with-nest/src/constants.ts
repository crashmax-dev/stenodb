import { CreateUserDto, Users } from './dto/users.dto'

export const initialUsersData = new Users(
  new CreateUserDto(1, 'John', 20),
  new CreateUserDto(2, 'Jane', 21),
  new CreateUserDto(3, 'Jack', 22)
)
