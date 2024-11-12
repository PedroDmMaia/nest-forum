import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Comment as PrismaComment, Prisma } from '@prisma/client'

export abstract class PrismaAnswerCommentMapper {
  public static toDomain(raw: PrismaComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type')
    }

    return AnswerComment.create(
      {
        content: raw.content,
        authorId: new UniqueEntityId(raw.authorId),
        answerId: new UniqueEntityId(raw.answerId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  public static toPrisma(
    answercomment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: answercomment.id.toString(),
      authorId: answercomment.authorId.toString(),
      answerId: answercomment.asnswerId.toString(),
      content: answercomment.content,
      createdAt: answercomment.createdAt,
      updatedAt: answercomment.updatedAt,
    }
  }
}
