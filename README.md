# stenodb [![](https://img.shields.io/npm/v/stenodb)](https://www.npmjs.org/package/stenodb)

> ✍ Easy to use local JSON database.

## Install

```sh
npm install stenodb
```

```sh
yarn add stenodb
```

```sh
pnpm add stenodb
```

| Package | Version | Description |
| ------- | ------ | ----------- |
| [@stenodb/node](./packages/node) | [![](https://img.shields.io/npm/v/@stenodb/node)](https://npm.im/@stenodb/node) | Node.js |
| [@stenodb/browser](./packages/browser) | [![](https://img.shields.io/npm/v/@stenodb/browser)](https://npm.im/@stenodb/browser) | Browser (localStorage, sessionStorage) |
| [@stenodb/nest](./packages/nest) | [![](https://img.shields.io/npm/v/@stenodb/nest)](https://npm.im/@stenodb/nest) | Nest.js module |
| [@stenodb/fastify](./packages/fastify) | [![](https://img.shields.io/npm/v/@stenodb/fastify)](https://npm.im/@stenodb/fastify) | Fastify plugin |
| [@stenodb/lodash](./packages/lodash) | [![](https://img.shields.io/npm/v/@stenodb/lodash)](https://npm.im/@stenodb/lodash) | Lodash wrapper for Node.js and Browser |
| [@stenodb/logger](./packages/logger) | [![](https://img.shields.io/npm/v/@stenodb/logger)](https://npm.im/@stenodb/logger) | Logger |

## Examples

> **Note**\
> You can find more detailed examples [here](./examples)

<details>
  <summary>class-transformer entity</summary>

  ```ts
  // entities.ts
  import { Type } from 'class-transformer'

  export class Users {
    @Type(() => User)
    users: User[]

    constructor(...users: User[]) {
      this.users = users
    }
  }

  export class User {
    username: string

    @Type(() => Post)
    posts: Post[]

    constructor(username: string, ...posts: Post[]) {
      this.username = username
      this.posts = posts
    }

    addPost(post: Post) {
      this.posts.push(post)
    }
  }

  export class Post {
    title: string

    constructor(text: string) {
      this.title = title
    }
  }
  ```
</details>

<details>
  <summary>@stenodb/node</summary>

  ```ts
  import 'reflect-metadata'
  import { dirname, resolve } from 'node:path'
  import { fileURLToPath } from 'node:url'
  import { AsyncAdapter, NodeProvider } from '@stenodb/node'
  import { Users, User, Post } from './entities.js'

  const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db')
  const initialData = new Users(new User('John Doe'))
  const adapter = new AsyncAdapter('users', Users, initialData)
  const provider = new NodeProvider({ path })
  const db = await provider.create(adapter)

  await db.read()
  db.data?.users[0]?.addPost(new Post('Lorem ipsum'))
  await db.write()
  ```
</details>

<details>
  <summary>@stenodb/browser</summary>

  ```ts
  import 'reflect-metadata'
  import { LocalStorage, BrowserProvider } from '@stenodb/browser'
  import { Users, User, Post } from './entities.js'

  const initialData = new Users(new User('John Doe'))
  const adapter = new LocalStorage('users', Users, initialData)
  const provider = new BrowserProvider()
  const db = provider.create(adapter)

  db.read()
  db.data?.users[0]?.addPost(new Post('Lorem ipsum'))
  db.write()
  ```
</details>

<details>
  <summary>@stenodb/nest</summary>

  ```ts
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
      this.usersProvider = await this.stenoService.create(
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
</details>

## Credits

- [steno](https://github.com/typicode/steno) - Specialized fast async file writer.
- [fastify-plugin](https://github.com/fastify/fastify-plugin) - Plugin helper for Fastify.
- [nest](https://github.com/nestjs/nest) - A progressive Node.js framework for building efficient and scalable server-side applications.
- [class-transformer](https://github.com/typestack/class-transformer) - Decorator-based transformation, serialization, and deserialization between objects and classes.
- [class-validator](https://github.com/typestack/class-validator) - Decorator-based property validation for classes.
- [class-validator-jsonschema](https://github.com/epiphone/class-validator-jsonschema) - Convert `class-validator` decorated classes into JSON schema.
- [json-difference](https://github.com/lukascivil/json-difference) - A simple way to find the difference between two objects or json diff.
- [tslog](https://github.com/fullstack-build/tslog) - Universal Logger for TypeScript and JavaScript.

## License

MIT - [crashmax](https://github.com/crashmax-dev)
