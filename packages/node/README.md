# @stenodb/node [![](https://img.shields.io/npm/v/@stenodb/node)](https://www.npmjs.org/package/@stenodb/node)

> ✍ Easy to use local JSON database.

## Install

```sh
npm install @stenodb/node
```

```sh
yarn add @stenodb/node
```

```sh
pnpm add @stenodb/node
```

## Usage

> **Warning**\
> stenodb is a pure ESM package. If you're having trouble using it in your project, please [read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

```typescript
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

```typescript
// index.ts
import 'reflect-metadata'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { AsyncWriter, NodeDatabase } from '@stenodb/node'
import { Users, User, Post } from './entities.js'

const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'database')
const adapter = new AsyncWriter('users', Users)
const initialData = new Users(new User('John Doe'))
const database = new NodeDatabase(path)
const databaseUsers = database.create(adapter, initialData)

await databaseUsers.read()
databaseUsers.data?.users[0]?.addPost(new Post('Lorem ipsum'))
await databaseUsers.write()
```

## Credits

- [steno](https://github.com/typicode/steno) - Specialized fast async file writer.
- [class-transformer](https://github.com/typestack/class-transformer) - Decorator-based transformation, serialization, and deserialization between objects and classes.
- [class-validator](https://github.com/typestack/class-validator) - Decorator-based property validation for classes.
- [json-difference](https://github.com/lukascivil/json-difference) - A simple way to find the difference between two objects or json diff.
- [tslog](https://github.com/fullstack-build/tslog) - Universal Logger for TypeScript and JavaScript.

## License

MIT - [crashmax](https://github.com/crashmax-dev)
