import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerCommentRepository } from '../repositories/answer-comment.repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerRepository } from '../repositories/answer.repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFounError } from '@/core/errors/error/resource-not-founs.error'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseRequestResponse = Either<
  ResourceNotFounError,
  { answerComment: AnswerComment }
>

export class CommentOnAnswerUseCaseUseCase {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseRequestResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFounError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.answerCommentRepository.create(answerComment)

    return right({ answerComment })
  }
}
