import { Test, TestingModule } from '@nestjs/testing'
import { StenoModule } from '@stenodb/nest'
import { resolve } from 'path'
import { UsersController } from './app.controller'
import { UsersService } from './app.service'
import { initialUsersData } from './constants'

describe('UsersController', () => {
  let usersController: UsersController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        StenoModule.register({
          path: resolve(process.cwd(), 'db', 'users')
        })
      ],
      controllers: [UsersController],
      providers: [UsersService]
    }).compile()

    await app.init()

    usersController = app.get<UsersController>(UsersController)
  })

  describe('root', () => {
    it('should return initialUsersData', () => {
      expect(usersController.getUsers()).toEqual(initialUsersData.users)
    })
  })
})
