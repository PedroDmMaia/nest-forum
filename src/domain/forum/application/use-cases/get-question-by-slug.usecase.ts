import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question.repository'
import { ResourceNotFounError } from '@/core/errors/error/resource-not-founs.error'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseRequestResponse = Either<
  ResourceNotFounError,
  { question: Question }
>

export class GetQuestionBySlugUseCaseUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseRequestResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      return left(new ResourceNotFounError())
    }

    return right({ question })
  }
}
