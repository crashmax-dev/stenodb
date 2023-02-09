import { Module } from '@nestjs/common'
import { StenoModule } from '@stenodb/nest'
import { resolve } from 'path'
import { UsersController } from './app.controller'
import { UsersService } from './app.service'

@Module({
  imports: [
    StenoModule.register({
      path: resolve(process.cwd(), 'db', 'users')
    })
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class AppModule {}
