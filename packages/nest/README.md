# @stenodb/nest [![](https://img.shields.io/npm/v/@stenodb/nest)](https://www.npmjs.org/package/@stenodb/nest)

> ✍ Easy to use local JSON database for [Nest.js](https://nestjs.com)

## Install

```sh
npm install @stenodb/nest
```

```sh
yarn add @stenodb/nest
```

```sh
pnpm add @stenodb/nest
```

## Usage

```typescript
// users.dto.ts
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

// app.module.ts
import { resolve } from 'node:path'
import { Module } from '@nestjs/common'
import { StenoModule } from '@stenodb/nest'

@Module({
  imports: [
    StenoModule.register({
      path: resolve(process.cwd(), 'db')
    })
  ]
})
export class AppModule {}

// users.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common'
import { Steno, StenoService } from '@stenodb/nest'
import { Users, CreateUserDto } from './users.dto'

@Injectable()
export class UsersService implements OnModuleInit {
  private usersProvider: Steno.NodeProvider<Users>

  constructor(private readonly stenoService: StenoService) {}

  async onModuleInit(): Promise<void> {
    this.usersProvider = await this.stenoService.createAsync(
      'users',
      Users,
      new Users(
        new CreateUserDto(1, 'John', 22)
      )
    )

    await this.usersProvider.read()
  }

  get users(): CreateUserDto[] {
    return this.usersProvider.data.users
  }
}
```

## Credits

- [steno](https://github.com/typicode/steno) - Specialized fast async file writer.
- [class-transformer](https://github.com/typestack/class-transformer) - Decorator-based transformation, serialization, and deserialization between objects and classes.
- [class-validator](https://github.com/typestack/class-validator) - Decorator-based property validation for classes.
- [json-difference](https://github.com/lukascivil/json-difference) - A simple way to find the difference between two objects or json diff.
- [tslog](https://github.com/fullstack-build/tslog) - Universal Logger for TypeScript and JavaScript.

## License

MIT - [crashmax](https://github.com/crashmax-dev)
