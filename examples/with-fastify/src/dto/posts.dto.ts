import { Exclude, Type } from 'class-transformer'
import { IsNumber, IsString, Length } from 'class-validator'

export class Post {
  @Exclude({ toPlainOnly: true })
  @IsNumber()
  postId: number

  @IsString()
  @Length(1, 128)
  subject: string

  @Exclude({ toPlainOnly: true })
  @Type(() => Date)
  createdAt: Date

  constructor(postId: number, subject: string, createdAt: Date) {
    this.postId = postId
    this.subject = subject
    this.createdAt = createdAt
  }
}
