import { Either, left, right } from '@/core/either'
import { QuestionRepository } from '../repositories/question.repository'
import { ResourceNotFounError } from '@/core/errors/error/resource-not-founs.error'
import { NotAllowedError } from '@/core/errors/error/not-allowed.error'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseRequestResponse = Either<
  ResourceNotFounError | NotAllowedError,
  null
>

export class DeleteQuestionUseCaseUseCase {
  constructor(private questionRepository: QuestionRepository) {}
  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseRequestResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFounError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionRepository.delete(question)

    return right(null)
  }
}
