import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipes'
import { z } from 'zod'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions.usecase'

const pageQueryParamsSchema = z.coerce.number().min(1).optional().default(1)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async hadle(@Query('page', queryValdiationPipe) page: PageQueryParamsSchema) {
    const questions = await this.fetchRecentQuestions.execute({
      page,
    })

    return { questions }
  }
}
