# stenodb [![](https://img.shields.io/npm/v/stenodb)](https://www.npmjs.org/package/stenodb)

> 🪶 Easy to use local JSON database. Ready to use with [LocalStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage), [SessionStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/sessionStorage) and Node.js.

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

## Usage

> **Warning**\
> stenodb is a pure ESM package. If you're having trouble using it in your project, please [read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).


### Entity
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

### Node.js

```typescript
import 'reflect-metadata'
import { join } from 'node:path'
import { NodeProvider } from 'stenodb/node'
import { Users, User, Post } from './entities.js'

const path = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'database')

const databaseProvider = new NodeProvider({
  path,
  logger: { enabled: true }
})

const databaseUsers = databaseProvider.createDatabase({
  name: 'users',
  entity: Users,
  initialData: new Users(new User('John Doe'))
})

databaseUsers.data?.users[0]?.addPost(new Post('Lorem ipsum'))
databaseUsers.write()
```

### Browser
```typescript
import 'reflect-metadata'
import { BrowserProvider, LocalStorage } from 'stenodb/browser'
import { Users, User, Post } from './entities.js'

const adapter = new LocalStorage<Users>('users')

const databaseUsers = new BrowserProvider({
  adapter,
  entity: Users,
  initialData: new Users(new User('John Doe'))
})

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
