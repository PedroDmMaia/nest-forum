import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository'
import { DeleteAnswerUseCase } from './delete-answer.usecase'
import { MakeAnswer } from 'test/factories/make-answers.factory'
import { NotAllowedError } from '@/core/errors/error/not-allowed.error'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments.repository'
import { MakeAnswerAttachment } from 'test/factories/make-answer-attachment.factory'

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    )
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a answer', async () => {
    const createdAnswer = MakeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryAnswerRepository.create(createdAnswer)

    inMemoryAnswerAttachmentRepository.items.push(
      MakeAnswerAttachment({
        answerId: createdAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      MakeAnswerAttachment({
        answerId: createdAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      authorId: 'author-1',
      answerId: 'question-1',
    })

    expect(inMemoryAnswerRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const createdAnswer = MakeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryAnswerRepository.create(createdAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: 'question-1',
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
