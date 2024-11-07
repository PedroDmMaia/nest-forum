import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer.repository'

interface FetchquestionsAnswersUseCaseRequest {
  quetionId: string
  page: number
}

type FetchquestionsAnswersUseCaseRequestResponse = Either<
  null,
  { answers: Answer[] }
>

export class FetchRecentAnswersUseCaseUseCase {
  constructor(private answersRepository: AnswerRepository) {}
  async execute({
    quetionId,
    page,
  }: FetchquestionsAnswersUseCaseRequest): Promise<FetchquestionsAnswersUseCaseRequestResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      quetionId,
      { page },
    )

    return right({ answers })
  }
}
