import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/user.entity';
import { AuthBaseUseCase } from '../interfaces/usecases/auth-base.usecase';

export class AuthBaseService implements AuthBaseUseCase {
  constructor(private readonly _usersService: UsersService) {}

  async checkAccesibleForAuthBase(
    username: string,
    password: string,
  ): Promise<boolean> {
    // Найти пользователя
    const user: User = await this._usersService.findUserByUsername(username);

    // Проверить что пароль корректен
    const isMatchPasswords = await this._usersService.isMatchPasswords(
      password,
      user.password,
    );

    // Предоставить либо отклонить доступ
    return isMatchPasswords;
  }
}
