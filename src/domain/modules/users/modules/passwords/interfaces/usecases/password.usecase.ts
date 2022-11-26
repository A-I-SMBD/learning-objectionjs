export const PasswordUseCaseSymbol = Symbol('PasswordUseCase');

export interface PasswordUseCase {
  isMatchPasswords(hash: string, ...passwords: string[]): Promise<boolean>;
}
