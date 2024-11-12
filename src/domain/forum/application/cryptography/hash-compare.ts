export abstract class HashComperer {
  abstract compare(plain: string, hash: string): Promise<boolean>
}
