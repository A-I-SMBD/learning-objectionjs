import { User } from '../../user.entity';

export const FindUserUseCaseSymbol = Symbol('FindUserUseCase');

export interface FindUserUseCase {
  findUserByUsername(username: string): Promise<User>;
}
