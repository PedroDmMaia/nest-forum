import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipes'
import { z } from 'zod'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comment.usecase'
import { CommentPresenter } from '../presenters/comment.presenter'

const pageQueryParamsSchema = z.coerce.number().min(1).optional().default(1)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('/questions/:questionId/comments')
export class FecthQuestionCommentsController {
  constructor(private fecthQuestionComments: FetchQuestionCommentsUseCase) {}

  @Get()
  async hadle(
    @Query('page', queryValdiationPipe) page: PageQueryParamsSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fecthQuestionComments.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { questionsComments } = result.value

    return { comments: questionsComments.map(CommentPresenter.toHttp) }
  }
}
