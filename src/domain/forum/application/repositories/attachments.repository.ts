import { Attachment } from '../../enterprise/entities/attachment'

export abstract class AttachmentsRepositorys {
  abstract create(attachment: Attachment): Promise<void>
}
