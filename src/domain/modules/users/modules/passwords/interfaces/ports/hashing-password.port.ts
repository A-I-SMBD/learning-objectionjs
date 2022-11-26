export interface HashingPasswordPort {
  isMatchPasswords(hash: string, ...passwords: string[]): Promise<boolean>;
}
