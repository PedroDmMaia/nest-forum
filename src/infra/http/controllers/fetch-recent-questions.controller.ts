import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipes'
import { z } from 'zod'
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-questions.usecase'
import { QuestionPresenter } from '../presenters/question.presenter'

const pageQueryParamsSchema = z.coerce.number().min(1).optional().default(1)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class FetchRecentQuestionController {
  constructor(private fetchRecentQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async hadle(@Query('page', queryValdiationPipe) page: PageQueryParamsSchema) {
    const result = await this.fetchRecentQuestions.execute({
      page,
    })

    if (result.isLeft()) {
      throw new Error()
    }

    const { questions } = result.value

    return { questions: questions.map(QuestionPresenter.toHttp) }
  }
}
