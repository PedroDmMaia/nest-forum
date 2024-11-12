import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student.reposotory'
import { FakeHasher } from 'test/cryptography/fak-hasher'
import { AuthenticateStudentUseCase } from './authneticate-student.usecase'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { MakeStudent } from 'test/factories/make-student.factory'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateStudentUseCase

describe('Authenticate student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateStudentUseCase(
      inMemoryStudentsRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a student', async () => {
    const student = MakeStudent({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456'),
    })

    inMemoryStudentsRepository.items.push(student)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    })

    console.log(result)

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      access_token: expect.any(String),
    })
  })
})
