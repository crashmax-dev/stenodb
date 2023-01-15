export class User {
  posts: Post[]

  constructor(public username: string, ...posts: Post[]) {
    this.posts = posts
  }
}

export class Post {
  constructor(public title: string) {}
}
