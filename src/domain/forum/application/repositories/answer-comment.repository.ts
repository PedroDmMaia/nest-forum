import { PaginationParams } from '@/core/repositories/pagination-parms.repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswerCommentRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  create(AnswerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
