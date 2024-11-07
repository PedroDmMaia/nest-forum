import { PaginationParams } from '@/core/repositories/pagination-parms.repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export interface AnswerRepository {
  findById(id: string): Promise<Answer | null>
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  create(answer: Answer): Promise<Answer>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
