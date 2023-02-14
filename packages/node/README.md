# @stenodb/node [![](https://img.shields.io/npm/v/@stenodb/node)](https://www.npmjs.org/package/@stenodb/node)

> ✍ Easy to use local JSON database for [Node.js](https://nodejs.org)

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

// index.ts
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

## Credits

- [steno](https://github.com/typicode/steno) - Specialized fast async file writer.
- [class-transformer](https://github.com/typestack/class-transformer) - Decorator-based transformation, serialization, and deserialization between objects and classes.
- [class-validator](https://github.com/typestack/class-validator) - Decorator-based property validation for classes.
- [json-difference](https://github.com/lukascivil/json-difference) - A simple way to find the difference between two objects or json diff.
- [tslog](https://github.com/fullstack-build/tslog) - Universal Logger for TypeScript and JavaScript.

## License

MIT - [crashmax](https://github.com/crashmax-dev)
