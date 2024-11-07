import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment.repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comment.usecase'
import { MakeAnswerComment } from 'test/factories/make-answer-comment.factory'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch recent comment', () => {
  beforeEach(() => {
    inMemoryCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryCommentRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryCommentRepository.create(
      MakeAnswerComment({ answerId: new UniqueEntityId('answer-01') }),
    )

    await inMemoryCommentRepository.create(
      MakeAnswerComment({ answerId: new UniqueEntityId('answer-01') }),
    )

    const result = await sut.execute({
      answerId: 'answer-01',
      page: 1,
    })

    expect(result.value?.answersComments).toHaveLength(2)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCommentRepository.create(
        MakeAnswerComment({
          answerId: new UniqueEntityId('answer-01'),
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-01',
      page: 2,
    })

    expect(result.value?.answersComments).toHaveLength(2)
  })
})
