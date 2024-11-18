import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionRepository } from '../repositories/question.repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comments.repository'
import { Either, left, right } from '@/core/either'
import { ResourceNotFounError } from '@/core/errors/error/resource-not-founs.error'
import { Injectable } from '@nestjs/common'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCasetResponse = Either<
  ResourceNotFounError,
  { questionComment: QuestionComment }
>

@Injectable()
export class CommentOnQuestionUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCasetResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResourceNotFounError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    })

    await this.questionCommentRepository.create(questionComment)

    return right({ questionComment })
  }
}
