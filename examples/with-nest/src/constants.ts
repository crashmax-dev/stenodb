import { User, Users } from './entities/users'

export const initialUsersData = new Users(
  new User(1, 'John', 20),
  new User(2, 'Jane', 21),
  new User(3, 'Jack', 22)
)
