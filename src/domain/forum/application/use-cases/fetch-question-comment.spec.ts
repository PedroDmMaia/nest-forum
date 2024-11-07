import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment.repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comment.usecase'
import { MakeQuestionComment } from 'test/factories/make-question-comment.factory'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryCommentRepository: InMemoryQuestionCommentRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch recent comment', () => {
  beforeEach(() => {
    inMemoryCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryCommentRepository)
  })

  it('should be able to fetch question amswer', async () => {
    await inMemoryCommentRepository.create(
      MakeQuestionComment({ questionId: new UniqueEntityId('question-01') }),
    )

    await inMemoryCommentRepository.create(
      MakeQuestionComment({ questionId: new UniqueEntityId('question-01') }),
    )

    const result = await sut.execute({
      questionId: 'question-01',
      page: 1,
    })

    expect(result.value?.questionsComments).toHaveLength(2)
  })

  it('should be able to fetch paginated question comment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCommentRepository.create(
        MakeQuestionComment({
          questionId: new UniqueEntityId('question-01'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-01',
      page: 2,
    })

    expect(result.value?.questionsComments).toHaveLength(2)
  })
})
