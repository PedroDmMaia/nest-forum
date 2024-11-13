import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug.usecase'
import { QuestionPresenter } from '../presenters/question.presenter'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlugs: GetQuestionBySlugUseCase) {}

  @Get()
  async hadle(@Param('slug') slug: string) {
    const result = await this.getQuestionBySlugs.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: QuestionPresenter.toHttp(result.value.question) }
  }
}
