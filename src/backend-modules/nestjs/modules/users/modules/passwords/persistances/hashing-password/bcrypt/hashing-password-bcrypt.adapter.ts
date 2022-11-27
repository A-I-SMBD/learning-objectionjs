import { HashingPasswordPort } from '../../../../../../../../../domain/modules/users/modules/passwords/interfaces/ports/hashing-password.port';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashingPasswordBcryptAdapter implements HashingPasswordPort {
  private readonly _saltRounds: number = 10;

  async generateHash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this._saltRounds);

    return hash;
  }

  /**
   * Сравнивает предоставленные пароли с хэшем
   * @param {string} hash изначальный хэш
   * @param {string} passwords пароли, которые нужно сравнить с хэшем
   * @returns true - если все пароли подошли к хэшу, иначе false
   */
  async isMatchPasswords(
    hash: string,
    ...passwords: string[]
  ): Promise<boolean> {
    let isMatch = false;

    for (const password of passwords) {
      isMatch = await bcrypt.compare(password, hash);

      if (!isMatch) break;
    }

    return isMatch;
  }
}
