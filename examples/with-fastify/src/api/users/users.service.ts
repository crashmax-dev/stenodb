import { User, Users } from '../../dto/users.dto.js'
import type { Steno } from '@stenodb/fastify'
import type { FastifyInstance } from 'fastify'

export class UserService {
  #users: Steno.NodeProvider<Users>

  constructor(private readonly fastify: FastifyInstance) {
    this.#users = this.fastify.steno.get<Users>('users')!
  }

  get users(): User[] {
    return this.#users.data!.users
  }

  get userPosts() {
    return this.users.map((user) => {
      return {
        id: user.userId,
        posts: user.posts
      }
    })
  }

  get userLastId(): number {
    return this.users.at(-1)!.userId
  }

  async write(): Promise<void> {
    await this.#users.write()
  }

  async addUser(username: string, age: number): Promise<User | null> {
    if (this.findUserByName(username)) return null

    const user = new User(this.userLastId + 1, username.toLowerCase(), age)
    this.users.push(user)
    await this.write()

    return user
  }

  findUserById(userId: number): User | undefined {
    return this.users.find((user) => user.userId === userId)
  }

  findUserByName(userName: string): User | undefined {
    return this.users.find((user) => user.username == userName)
  }

  async deleteUser(userId: number): Promise<User | null> {
    const user = this.findUserById(userId)
    if (user) {
      this.#users.data!.users = this.users.filter(
        (user) => user.userId !== userId
      )
      await this.write()
      return user
    }

    return null
  }
}
