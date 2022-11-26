import { HashingPasswordPort } from '../interfaces/ports/hashing-password.port';
import { PasswordUseCase } from '../interfaces/usecases/password.usecase';

export class PasswordsService implements PasswordUseCase {
  constructor(private readonly _hashingPasswordPort: HashingPasswordPort) {}

  async isMatchPasswords(
    hash: string,
    ...passwords: string[]
  ): Promise<boolean> {
    const isMatch = await this._hashingPasswordPort.isMatchPasswords(
      hash,
      ...passwords,
    );

    return isMatch;
  }
}
