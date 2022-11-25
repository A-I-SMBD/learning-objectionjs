import { CreateUserPort } from '../interfaces/ports/create-user.port';
import { FindUserPort } from '../interfaces/ports/find-user.port';
import { HashingPasswordPort } from '../interfaces/ports/hashing-password.port';
import { CreateUserCommand } from '../interfaces/usecase/create-user/create-user.command';
import { CreateUserUseCase } from '../interfaces/usecase/create-user/create-user.usecase';
import { FindUserUseCase } from '../interfaces/usecase/create-user/find-user.usecase';
import { PasswordUseCase } from '../interfaces/usecase/password/password.usecase';
import { User, UserId } from '../user.entity';

export class UsersService
  implements CreateUserUseCase, FindUserUseCase, PasswordUseCase
{
  constructor(
    private readonly _findUserPort: FindUserPort,
    private readonly _createUserPort: CreateUserPort,
    private readonly _hashingPasswordPort: HashingPasswordPort,
  ) {}

  async isMatchPasswords(...passwords: string[]): Promise<boolean> {
    const isMatch = await this._hashingPasswordPort.isMatchPasswords(
      ...passwords,
    );

    return isMatch;
  }

  async findUserByUsername(username: string): Promise<User> {
    const user: User = await this._findUserPort.findUserByUsername(username);

    if (!user) return null;

    return user;
  }

  async createUser(command: CreateUserCommand): Promise<UserId> {
    // Проверить не занят ли ник
    const existingUser: User = await this.findUserByUsername(
      command.user.username,
    );

    // Если пользователь с данным ником есть,
    // То создавать пользователя нельзя
    // TODO: - сделать MonadaEither контейнер
    if (existingUser) return null;

    // Реализовать команду
    const userId = this._createUserPort.createUser(command.user);

    // TODO: - сделать MonadaEither контейнер
    if (!userId) return null;

    // Вернуть id созданного пользователя
    return userId;
  }
}
