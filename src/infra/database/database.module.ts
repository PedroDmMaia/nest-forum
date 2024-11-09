import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionRepository } from './prisma/repositories/prisma-question.repository'
import { PrismaQuestionCommentRepository } from './prisma/repositories/prisma-question-comment.repository'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachment.repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answers.repository'
import { PrismaAnswerCommentRepository } from './prisma/repositories/prisma-answer-comment.repository'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachment.repository'
import { QuestionRepository } from '@/domain/forum/application/repositories/question.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionRepository,
      useClass: PrismaQuestionRepository,
    },
    PrismaQuestionRepository,
    PrismaQuestionCommentRepository,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerAttachmentRepository,
  ],
  exports: [
    PrismaService,
    QuestionRepository,
    PrismaQuestionCommentRepository,
    PrismaQuestionAttachmentRepository,
    PrismaAnswerRepository,
    PrismaAnswerCommentRepository,
    PrismaAnswerAttachmentRepository,
  ],
})
export class DatabaseModule {}
