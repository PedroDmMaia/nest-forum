import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAnswerCommentMapper } from '@/infra/database/prisma/mappers/prisma-answer-comment.mapper'

export function MakeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const commentAnswer = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return commentAnswer
}

@Injectable()
export class AnswerCommentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaQuestion(
    data: Partial<AnswerCommentProps> = {},
  ): Promise<AnswerComment> {
    const answerComment = MakeAnswerComment(data)

    await this.prisma.comment.create({
      data: PrismaAnswerCommentMapper.toPrisma(answerComment),
    })

    return answerComment
  }
}
