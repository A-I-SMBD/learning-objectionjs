import { User } from '../../user.entity';

export interface FindUserPort {
  findUserByUsername(username: string): Promise<User>;
}
