import { UseCaseError } from '@/core/errors/use-case.error'

export class ResourceNotFounError extends Error implements UseCaseError {
  constructor() {
    super('Resource Not Foun')
  }
}
