export const PasswordUseCaseSymbol = Symbol('PasswordUseCase');

export interface PasswordUseCase {
  generateHash(password: string): Promise<string>;

  isMatchPasswords(hash: string, ...passwords: string[]): Promise<boolean>;
}
