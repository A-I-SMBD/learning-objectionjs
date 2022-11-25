export interface PasswordUseCase {
  isMatchPasswords(...passwords: string[]): Promise<boolean>;
}
