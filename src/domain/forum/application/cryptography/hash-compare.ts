export abstract class HashComaperer {
  abstract compare(plain: string, hash: string): Promise<boolean>
}
