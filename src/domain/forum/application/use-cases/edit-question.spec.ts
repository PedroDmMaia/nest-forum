import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions.repository'
import { MakeQuestion } from 'test/factories/make-question.factory'
import { EditQuestionUseCase } from './edit-question.usecase'
import { NotAllowedError } from '@/core/errors/error/not-allowed.error'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-questions-attachments.repository'
import { MakeQuestionAttachment } from 'test/factories/make-question-attachment.factory'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: EditQuestionUseCase

describe('DeleteQuestionion', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new EditQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionAttachmentRepository,
    )
  })

  it('should be able to edit a question', async () => {
    const createdQuestion = MakeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryQuestionRepository.create(createdQuestion)

    inMemoryQuestionAttachmentRepository.items.push(
      MakeQuestionAttachment({
        questionId: createdQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      MakeQuestionAttachment({
        questionId: createdQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: 'author-1',
      title: 'test question',
      content: 'test content',
      attachmensIds: ['1', '3'],
    })

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'test question',
      content: 'test content',
    })
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionRepository.items[0].attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  it('should not be able to edit a question from another user', async () => {
    const createdQuestion = MakeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryQuestionRepository.create(createdQuestion)

    const result = await sut.execute({
      questionId: createdQuestion.id.toString(),
      authorId: 'author-2',
      title: 'test question',
      content: 'test content',
      attachmensIds: [],
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
