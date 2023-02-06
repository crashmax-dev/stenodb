# @stenodb/browser [![](https://img.shields.io/npm/v/@stenodb/browser)](https://www.npmjs.org/package/@stenodb/browser)

> ✍ Easy to use local JSON database for [LocalStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage) and [SessionStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/sessionStorage).

## Install

```sh
npm install @stenodb/browser
```

```sh
yarn add @stenodb/browser
```

```sh
pnpm add @stenodb/browser
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
import { LocalStorage, BrowserDatabase } from '@stenodb/browser'
import { Users, User, Post } from './entities.js'

const adapter = new LocalStorage('users', Users)
const initialData = new Users(new User('John Doe'))
const databaseUsers = new BrowserDatabase(adapter, initialData)

databaseUsers.read()
databaseUsers.data?.users[0]?.addPost(new Post('Lorem ipsum'))
databaseUsers.write()
```

## Credits

- [steno](https://github.com/typicode/steno) - Specialized fast async file writer.
- [class-transformer](https://github.com/typestack/class-transformer) - Decorator-based transformation, serialization, and deserialization between objects and classes.
- [class-validator](https://github.com/typestack/class-validator) - Decorator-based property validation for classes.
- [json-difference](https://github.com/lukascivil/json-difference) - A simple way to find the difference between two objects or json diff.
- [tslog](https://github.com/fullstack-build/tslog) - Universal Logger for TypeScript and JavaScript.

## License

MIT - [crashmax](https://github.com/crashmax-dev)
