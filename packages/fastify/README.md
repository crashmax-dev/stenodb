# @stenodb/fastify [![](https://img.shields.io/npm/v/@stenodb/fastify)](https://www.npmjs.org/package/@stenodb/fastify)

> ✍ Easy to use local JSON database for [Fastify](https://fastify.io)

## Install

```sh
npm install @stenodb/fastify
```

```sh
yarn add @stenodb/fastify
```

```sh
pnpm add @stenodb/fastify
```

## Usage

```ts
// index.ts
import Fastify from 'fastify'
import { resolve } from 'node:path'
import { AsyncAdapter, FastifySteno } from '@stenodb/fastify'
import { Users, User } from './entities.js'

const fastify = Fastify()

const initialData = new Users(
  new User('John'),
  new User('Alice')
)

const usersAdapter = new AsyncAdapter(
  'users',
  Users,
  initialData
)

fastify.register(FastifySteno, {
  path: resolve(dirname(fileURLToPath(import.meta.url)), '..', 'db'),
  entities: [User, Post],
  adapters: [usersAdapter]
})

fastify.get('/users', () => {
  const users = fastify.steno.get<Users>('users')
  return users.data
})

fastify.listen({ host: '0.0.0.0', port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(address)
})
```

## Credits

- [steno](https://github.com/typicode/steno) - Specialized fast async file writer.
- [fastify-plugin](https://github.com/fastify/fastify-plugin) - Plugin helper for Fastify.
- [class-transformer](https://github.com/typestack/class-transformer) - Decorator-based transformation, serialization, and deserialization between objects and classes.
- [class-validator](https://github.com/typestack/class-validator) - Decorator-based property validation for classes.
- [class-validator-jsonschema](https://github.com/epiphone/class-validator-jsonschema) - Convert `class-validator` decorated classes into JSON schema.
- [json-difference](https://github.com/lukascivil/json-difference) - A simple way to find the difference between two objects or json diff.
- [tslog](https://github.com/fullstack-build/tslog) - Universal Logger for TypeScript and JavaScript.

## License

MIT - [crashmax](https://github.com/crashmax-dev)
