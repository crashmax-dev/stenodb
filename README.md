# stenodb

## Installation

```sh
npm install stenodb
```

## Usage

```typescript
// entities.ts
import { Type } from 'class-transformer'

export class Users {
  @Type(() => User)
  users: User[]
}

export class User {
  username: string
  posts: Post[]

  constructor(username: string, posts?: Post[]) {
    this.username = username
    this.posts = posts ?? []
  }

  addPost(post: Post) {
    this.posts.push(post)
  }
}

export class Post {
  title: string

  constructor(title: string) {
    this.title = title
  }
}

// index.ts
import 'reflect-metadata'
import { NodeDatabaseProvider } from 'stenodb/node'

const databaseProvider = new NodeDatabaseProvider({
  path: join(process.cwd(), 'database')
})

const databaseUsers = await databaseProvider.createDatabase({
  name: 'users',
  entity: Users,
  initialData: {
    users: [new User('John Doe')]
  }
})

console.log(databaseUsers.data)
```
