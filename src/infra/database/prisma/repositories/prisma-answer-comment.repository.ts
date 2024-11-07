import { PaginationParams } from '@/core/repositories/pagination-parms.repository'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comment.repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAnswerCommentRepository implements AnswerCommentRepository {
  constructor(private prisma: PrismaService) {}

  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.')
  }

  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.')
  }

  create(AnswerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
