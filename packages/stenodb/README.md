# stenodb [![](https://img.shields.io/npm/v/stenodb)](https://www.npmjs.org/package/stenodb)

> ✍ Easy to use local JSON database. Ready to use with [LocalStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage), [SessionStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/sessionStorage) and Node.js.

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
| [stenodb](./packages/stenodb) | [![](https://img.shields.io/npm/v/stenodb)](https://npm.im/stenodb) | Meta package |
| [@stenodb/node](./packages/node) | [![](https://img.shields.io/npm/v/@stenodb/node)](https://npm.im/@stenodb/node) | ... |
| [@stenodb/browser](./packages/browser) | [![](https://img.shields.io/npm/v/@stenodb/browser)](https://npm.im/@stenodb/browser) | ... |

## Usage

> **Warning**\
> stenodb is a pure ESM package. If you're having trouble using it in your project, please [read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).


### Database entities
```typescript
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

### `@stenodb/node`

```typescript
import 'reflect-metadata'
import { join } from 'node:path'
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

### `@stenodb/browser`
```typescript
import 'reflect-metadata'
import { LocalStorage, BrowserDatabase } from '@stenodb/browser'
import { Users, User, Post } from './entities.js'

const adapter = new LocalStorage('users', Users)
const initialData = new Users(new User('John Doe'))
const databaseUsers = new BrowserDatabase(adapter, initialData)

databaseUsers.read()
databaseUsers.data?.users[0]?.addPost(new Post('Lorem ipsum'))
databaseUsers.write()
```

## Related

- [steno](https://github.com/typicode/steno) - Specialized fast async file writer.
- [class-transformer](https://github.com/typestack/class-transformer) - Decorator-based transformation, serialization, and deserialization between objects and classes.
- [class-validator](https://github.com/typestack/class-validator) - Decorator-based property validation for classes.
- [json-difference](https://github.com/lukascivil/json-difference) - A simple way to find the difference between two objects or json diff.

## License

MIT - [crashmax](https://github.com/crashmax-dev)
