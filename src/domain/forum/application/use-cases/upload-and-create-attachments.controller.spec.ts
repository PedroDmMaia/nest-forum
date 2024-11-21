import { InMemoryAttachmentRepository } from 'test/repositories/in-memory-attachments.repository'
import { UploadAndCreateAttachmentUseCase } from './upload-and-create-attachments.controller'
import { FakeUploader } from 'test/storage/fake-uploader'
import { InvalidAttachmentTypeError } from './errors/invalid-type-attachment.error'

let inMemoryAttachmentRepository: InMemoryAttachmentRepository
let fakeUploader: FakeUploader

let sut: UploadAndCreateAttachmentUseCase

describe('Upload and create Attachment', () => {
  beforeEach(() => {
    inMemoryAttachmentRepository = new InMemoryAttachmentRepository()
    fakeUploader = new FakeUploader()

    sut = new UploadAndCreateAttachmentUseCase(
      inMemoryAttachmentRepository,
      fakeUploader,
    )
  })

  it('should be able to upload and create a attachment', async () => {
    const result = await sut.execute({
      fileName: 'best.jpg',
      fileType: 'image/jpg',
      body: Buffer.from(''),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      attachment: inMemoryAttachmentRepository.items[0],
    })
    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'best.jpg',
      }),
    )
  })

  it('not should be able to upload and create a attachment with invalid file type', async () => {
    const result = await sut.execute({
      fileName: 'best.mp3',
      fileType: 'image/mpeg',
      body: Buffer.from(''),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })
})
