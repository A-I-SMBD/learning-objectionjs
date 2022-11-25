import { User, UserId } from '../../user.entity';

export interface CreateUserPort {
  createUser(user: User): Promise<UserId>;
}
