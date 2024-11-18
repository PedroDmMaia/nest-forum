import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipes'
import { z } from 'zod'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question.usecase'

const commentOnQuestionBodySchema = z.object({
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof commentOnQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(commentOnQuestionBodySchema)

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentOnQuestion: CommentOnQuestionUseCase) {}

  @Post()
  async hadle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body
    const userId = user.sub

    const result = await this.commentOnQuestion.execute({
      questionId,
      authorId: userId,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
