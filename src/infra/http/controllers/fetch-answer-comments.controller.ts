import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipes'
import { z } from 'zod'
import { CommentPresenter } from '../presenters/comment.presenter'
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-answer-comment.usecase'

const pageQueryParamsSchema = z.coerce.number().min(1).optional().default(1)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('/answers/:answerId/comments')
export class FecthAnswerCommentsController {
  constructor(private fecthAnswerComments: FetchAnswerCommentsUseCase) {}

  @Get()
  async hadle(
    @Query('page', queryValdiationPipe) page: PageQueryParamsSchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.fecthAnswerComments.execute({
      page,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { answersComments } = result.value

    return { comments: answersComments.map(CommentPresenter.toHttp) }
  }
}
