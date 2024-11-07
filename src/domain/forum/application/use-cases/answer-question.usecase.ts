import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer.repository'
import { Either, right } from '@/core/either'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttchemntList } from '../../enterprise/entities/answer-attachment-list'

interface AnswerUseCaseRequest {
  inspectorId: string
  questionId: string
  attachmentsIds: string[]
  content: string
}

type AnswerUseCaseResponse = Either<null, { answer: Answer }>

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    inspectorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerUseCaseRequest): Promise<AnswerUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(inspectorId),
      questionId: new UniqueEntityId(questionId),
    })

    const answerAttachment = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachments = new AnswerAttchemntList(answerAttachment)

    await this.answerRepository.create(answer)

    return right({ answer })
  }
}
