import { RegisterStudentUseCase } from './register-student.usecase'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-student.reposotory'
import { FakeHasher } from 'test/cryptography/fak-hasher'

let inMemoryStudentsRepository: InMemoryStudentsRepository
let fakeHasher: FakeHasher
let sut: RegisterStudentUseCase

describe('Register student', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    fakeHasher = new FakeHasher()

    sut = new RegisterStudentUseCase(inMemoryStudentsRepository, fakeHasher)
  })

  it('should be able to create a new student', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      student: inMemoryStudentsRepository.items[0],
    })
  })

  it('should hash student password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPAssword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryStudentsRepository.items[0].password).toEqual(hashedPAssword)
  })
})
