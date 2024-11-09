import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { QuestionRepository } from '@/domain/forum/application/repositories/question.repository'
import { AnswerCreatedEvent } from '@/domain/forum/enterprise/events/answer-created-event.event'
import { SendNotificationUseCase } from '../use-case/send-notification.usecase'

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepostitory: QuestionRepository,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepostitory.findById(
      answer.questionId.toString(),
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question?.authorId.toString(),
        title: `Nova resposta em "${question.title.substring(0, 40).concat('...')}"`,
        content: answer.excerpt,
      })
    }
  }
}
