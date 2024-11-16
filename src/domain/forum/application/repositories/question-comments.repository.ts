import { PaginationParams } from '@/core/repositories/pagination-parms.repository'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export abstract class QuestionCommentRepository {
  abstract findById(id: string): Promise<QuestionComment | null>
  abstract findManyByQuestioId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract create(questionComment: QuestionComment): Promise<void>
  abstract delete(questionComment: QuestionComment): Promise<void>
}
