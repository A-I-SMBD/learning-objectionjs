export interface AuthBaseUseCase {
  checkAccesibleForAuthBase(
    username: string,
    password: string,
  ): Promise<boolean>;
}
