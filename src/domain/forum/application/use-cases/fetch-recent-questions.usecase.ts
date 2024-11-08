import { Either, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question.reposotory'
import { Injectable } from '@nestjs/common'

interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseRequestResponse = Either<
  null,
  { questions: Question[] }
>

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseRequestResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return right({ questions })
  }
}
