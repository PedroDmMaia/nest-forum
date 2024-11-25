import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-parms.repository'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachment.repository'
import { QuestionRepository } from '@/domain/forum/application/repositories/question.repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = []

  constructor(
    private questionAttachmentRepository: QuestionAttachmentRepository,
  ) {}

  async findById(id: string) {
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) return null

    return question
  }

  async findBySlug(slug: string) {
    const questions = this.items.find((item) => item.slug.value === slug)

    if (!questions) {
      return null
    }

    return questions
  }

  async findManyRecent({ page }: PaginationParams) {
    const questions = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return questions
  }

  async save(question: Question) {
    const itemIndex = this.items.findIndex((items) => items.id === question.id)

    DomainEvents.dispatchEventsForAggregate(question.id)

    this.questionAttachmentRepository.createMany(
      question.attachments.getItems(),
    )

    this.questionAttachmentRepository.deleteMany(
      question.attachments.getRemovedItems(),
    )

    this.items[itemIndex] = question
  }

  async create(question: Question) {
    this.items.push(question)

    this.questionAttachmentRepository.createMany(
      question.attachments.getItems(),
    )

    DomainEvents.dispatchEventsForAggregate(question.id)

    return question
  }

  async delete(question: Question) {
    const itemIndex = this.items.findIndex((items) => items.id === question.id)

    this.items.splice(itemIndex, 1)

    this.questionAttachmentRepository.deleteManyByQuestionId(
      question.id.toString(),
    )
  }
}
