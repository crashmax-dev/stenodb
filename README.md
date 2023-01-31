# stenodb

## Installation

```sh
npm install stenodb
```

## Usage

### Entity
```typescript
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
```

### Node.js

```typescript
import 'reflect-metadata'
import { join } from 'node:path'
import { NodeProvider } from 'stenodb/node'
import { Users, User, Post } from './entities.js'

const databaseProvider = new NodeProvider({
  path: join(process.cwd(), 'database'),
  logger: { enabled: true }
})

const databaseUsers = databaseProvider.createDatabase({
  name: 'users',
  entity: Users,
  initialData: {
    users: [new User('John Doe')]
  }
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

export const storage = new BrowserProvider({
  adapter,
  entity: Users,
  initialData: new Users(new User(1, 'John'))
})

databaseUsers.data?.users[0]?.addPost(new Post('Lorem ipsum'))
databaseUsers.write()
```
