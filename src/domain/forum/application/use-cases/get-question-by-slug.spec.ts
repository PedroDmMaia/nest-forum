import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions.repository'
import { GetQuestionBySlugUseCaseUseCase } from './get-question-by-slug.usecase'
import { MakeQuestion } from 'test/factories/make-question.factory'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-questions-attachments.repository'

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCaseUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new GetQuestionBySlugUseCaseUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const createdQuestion = MakeQuestion({
      slug: Slug.create('example-question'),
    })

    inMemoryQuestionRepository.create(createdQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: createdQuestion.title,
      }),
    })
  })
})
