import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentRepository } from '../repositories/answer-comment.repository'
import { Injectable } from '@nestjs/common'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  { answersComments: AnswerComment[] }
>

@Injectable()
export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}
  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answersComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({ answersComments })
  }
}
