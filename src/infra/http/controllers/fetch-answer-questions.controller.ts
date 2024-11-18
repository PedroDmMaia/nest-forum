import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipes'
import { z } from 'zod'
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/fetch-question-answers.use.case'
import { AnswerPresenter } from '../presenters/answer.presenter'

const pageQueryParamsSchema = z.coerce.number().min(1).optional().default(1)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('/questions/:questionId/answers')
export class FetchQuestionAnswersController {
  constructor(private fetchQuestionAnswers: FetchQuestionAnswersUseCase) {}

  @Get()
  async hadle(
    @Query('page', queryValdiationPipe) page: PageQueryParamsSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionAnswers.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { answers } = result.value

    return { answers: answers.map(AnswerPresenter.toHttp) }
  }
}
