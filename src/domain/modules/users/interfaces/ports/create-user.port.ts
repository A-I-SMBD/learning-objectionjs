import { User, UserId } from '../../user.entity';

export interface CreateUserPort {
  /**
   * Создание пользователя по экземпляру класса User
   * @param {Omit<User, 'id'>} user объект, имеющий все свойства из User кроме id
   * @return id созданного пользователя
   */
  createUser(user: Omit<User, 'id'>): Promise<UserId>;
}
