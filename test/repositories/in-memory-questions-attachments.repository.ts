import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachment.repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentRepository
  implements QuestionAttachmentRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachment = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachment
  }

  async createMany(attachmens: QuestionAttachment[]): Promise<void> {
    this.items.push(...attachmens)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachment = this.items.filter((item) => {
      return !attachments.some((Attachment) => Attachment.equals(item))
    })

    this.items = questionAttachment
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachment = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.items = questionAttachment
  }
}
