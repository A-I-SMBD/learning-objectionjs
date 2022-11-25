export interface HashingPasswordPort {
  isMatchPasswords(...passwords: string[]): Promise<boolean>;
}
