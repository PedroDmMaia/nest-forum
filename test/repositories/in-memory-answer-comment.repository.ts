import { PaginationParams } from '@/core/repositories/pagination-parms.repository'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentRepository
  implements AnswerCommentRepository
{
  public items: AnswerComment[] = []

  async findById(id: string): Promise<AnswerComment | null> {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) return null

    return answer
  }

  async findManyByAnswerId(answerId: string, params: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.asnswerId.toString() === answerId)
      .slice((params.page - 1) * 20, params.page * 20)

    return questionComments
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
