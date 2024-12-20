import { PaginationParams } from '@/core/repositories/pagination-parms.repository'
import { Question } from '../../enterprise/entities/question'

export abstract class QuestionRepository {
  abstract findById(id: string): Promise<Question | null>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract save(question: Question): Promise<void>
  abstract create(question: Question): Promise<Question>
  abstract delete(question: Question): Promise<void>
}
