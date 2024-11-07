import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answers.repository'
import { FetchRecentAnswersUseCaseUseCase } from './fetch-recent-answers.use.case'
import { MakeAnswer } from 'test/factories/make-answers.factory'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answer-attachments.repository'

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryAnswersRepository: InMemoryAnswerRepository
let sut: FetchRecentAnswersUseCaseUseCase

describe('Fetch recent answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryAnswersRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    )
    sut = new FetchRecentAnswersUseCaseUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question amswer', async () => {
    await inMemoryAnswersRepository.create(
      MakeAnswer({ questionId: new UniqueEntityId('question-01') }),
    )

    await inMemoryAnswersRepository.create(
      MakeAnswer({ questionId: new UniqueEntityId('question-01') }),
    )

    await inMemoryAnswersRepository.create(
      MakeAnswer({ questionId: new UniqueEntityId('question-01') }),
    )

    const result = await sut.execute({
      quetionId: 'question-01',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        MakeAnswer({
          questionId: new UniqueEntityId('question-01'),
        }),
      )
    }

    const result = await sut.execute({
      quetionId: 'question-01',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
