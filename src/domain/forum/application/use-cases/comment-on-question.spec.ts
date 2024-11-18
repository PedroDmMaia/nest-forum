import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions.repository'
import { MakeQuestion } from 'test/factories/make-question.factory'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comment.repository'
import { CommentOnQuestionUseCase } from './comment-on-question.usecase'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-questions-attachments.repository'

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = MakeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'New comment',
    })

    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual(
      'New comment',
    )
  })
})
