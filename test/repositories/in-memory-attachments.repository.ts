import { AttachmentsRepositorys } from '@/domain/forum/application/repositories/attachments.repository'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'

export class InMemoryAttachmentRepository implements AttachmentsRepositorys {
  public items: Attachment[] = []

  constructor() {}

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}
