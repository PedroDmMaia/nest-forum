import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentsRepository } from '../repositories/student.repository'
import { HashComaperer } from '../cryptography/hash-compare'
import { Encrypter } from '../cryptography/encripter'
import { WrongCreadentialsError } from './errors/wrong-credentials.error'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCreadentialsError,
  { access_token: string }
>

@Injectable()
export class AuthenticateStudentUseCase {
  constructor(
    private studentsRepository: StudentsRepository,
    private hashComaperer: HashComaperer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const student = await this.studentsRepository.findByEmail(email)

    if (!student) {
      return left(new WrongCreadentialsError())
    }

    const isPasswordValid = await this.hashComaperer.compare(
      password,
      student.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCreadentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: student.id.toString(),
    })

    return right({ access_token: accessToken })
  }
}
