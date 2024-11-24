import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionRepository } from './prisma/repositories/prisma-question.repository'
import { PrismaQuestionCommentRepository } from './prisma/repositories/prisma-question-comment.repository'
import { PrismaQuestionAttachmentRepository } from './prisma/repositories/prisma-question-attachment.repository'
import { PrismaAnswerRepository } from './prisma/repositories/prisma-answers.repository'
import { PrismaAnswerCommentRepository } from './prisma/repositories/prisma-answer-comment.repository'
import { PrismaAnswerAttachmentRepository } from './prisma/repositories/prisma-answer-attachment.repository'
import { QuestionRepository } from '@/domain/forum/application/repositories/question.repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/student.repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-student.repository'
import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments.repository'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachment.repository'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository'
import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachment.repository'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments.repository'
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachment.repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionRepository,
      useClass: PrismaQuestionRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: QuestionCommentRepository,
      useClass: PrismaQuestionCommentRepository,
    },
    {
      provide: QuestionAttachmentRepository,
      useClass: PrismaQuestionAttachmentRepository,
    },
    {
      provide: AnswerRepository,
      useClass: PrismaAnswerRepository,
    },
    {
      provide: AnswerCommentRepository,
      useClass: PrismaAnswerCommentRepository,
    },
    {
      provide: AnswerAttachmentRepository,
      useClass: PrismaAnswerAttachmentRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionRepository,
    StudentsRepository,
    QuestionCommentRepository,
    QuestionAttachmentRepository,
    AnswerRepository,
    AnswerCommentRepository,
    AnswerAttachmentRepository,
    AttachmentsRepository,
  ],
})
export class DatabaseModule {}
