import { Either, left, right } from '@/core/either'
import { AnswerCommentRepository } from '../repositories/answer-comment.repository'
import { ResourceNotFounError } from '@/core/errors/error/resource-not-founs.error'
import { NotAllowedError } from '@/core/errors/error/not-allowed.error'
import { Injectable } from '@nestjs/common'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseRequestResponse = Either<
  ResourceNotFounError | NotAllowedError,
  null
>

@Injectable()
export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseRequestResponse> {
    const questionComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!questionComment) {
      return left(new ResourceNotFounError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(questionComment)

    return right(null)
  }
}
