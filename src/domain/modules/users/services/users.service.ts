import { CreateUserCommand } from '../interfaces/usecase/create-user/create-user.command';
import { CreateUserUseCase } from '../interfaces/usecase/create-user/create-user.usecase';
import { UserId } from '../user.entity';

export class UsersService implements CreateUserUseCase {
  createUser(command: CreateUserCommand): Promise<UserId> {
    // Проверить не занят ли ник

    // Реализовать команду

    // Вернуть id созданного пользователя

    // Обработка непредвиденных исключений
    throw new Error('Method not implemented.');
  }
}
