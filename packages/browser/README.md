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

## Credits

- [steno](https://github.com/typicode/steno) - Specialized fast async file writer.
- [class-transformer](https://github.com/typestack/class-transformer) - Decorator-based transformation, serialization, and deserialization between objects and classes.
- [class-validator](https://github.com/typestack/class-validator) - Decorator-based property validation for classes.

## License

MIT - [crashmax](https://github.com/crashmax-dev)
