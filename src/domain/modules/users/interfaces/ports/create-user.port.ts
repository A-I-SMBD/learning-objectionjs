import { User, UserId } from '../../user.entity';

export interface CreateUserPort {
  /**
   * Создание пользователя по экземпляру класса User
   * @param {User} user экземпляр класса USer
   * @return id созданного пользователя
   */
  createUser(user: User): Promise<UserId>;
}
