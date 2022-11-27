import { CreateUserPort } from '../interfaces/ports/create-user.port';
import { FindUserPort } from '../interfaces/ports/find-user.port';
import { CreateUserCommand } from '../interfaces/usecases/create-user/create-user.command';
import { CreateUserUseCase } from '../interfaces/usecases/create-user/create-user.usecase';
import { FindUserUseCase } from '../interfaces/usecases/find-user.usecase';
import { PasswordUseCase } from '../modules/passwords/interfaces/usecases/password.usecase';
import { User, UserId } from '../user.entity';

export const UsersServiceSymbol = Symbol('UsersService');

export class UsersService implements CreateUserUseCase, FindUserUseCase {
  constructor(
    private readonly _findUserPort: FindUserPort,
    private readonly _createUserPort: CreateUserPort,
    private readonly _passwordUseCase: PasswordUseCase,
  ) {}

  async findUserByUsername(username: string): Promise<User> {
    const user: User = await this._findUserPort.findUserByUsername(username);

    if (!user) return null;

    return user;
  }

  async createUser({ user }: CreateUserCommand): Promise<UserId> {
    // Проверить не занят ли ник
    const existingUser: User = await this.findUserByUsername(user.username);

    // Если пользователь с данным ником есть,
    // То создавать пользователя нельзя
    // TODO: - сделать MonadaEither контейнер
    if (existingUser) return null;

    // Захешировать пароль
    const hash = await this._passwordUseCase.generateHash(user.password);
    user.password = hash;

    // Реализовать команду
    const userId = this._createUserPort.createUser(user);

    // TODO: - сделать MonadaEither контейнер
    if (!userId) return null;

    // Вернуть id созданного пользователя
    return userId;
  }
}
