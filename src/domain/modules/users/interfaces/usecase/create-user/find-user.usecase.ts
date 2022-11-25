import { User } from '../../../user.entity';

export interface FindUserUseCase {
  findUserByUsername(username: string): Promise<User>;
}
