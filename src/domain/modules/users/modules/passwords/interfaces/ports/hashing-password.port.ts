export interface HashingPasswordPort {
  generateHash(password: string): Promise<string>;

  isMatchPasswords(hash: string, ...passwords: string[]): Promise<boolean>;
}
