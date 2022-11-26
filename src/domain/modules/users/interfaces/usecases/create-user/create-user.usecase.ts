import { UserId } from '../../../user.entity';
import { CreateUserCommand } from './create-user.command';

export const CreateUserUseCaseSymbol = Symbol('CreateUserUseCase');

export interface CreateUserUseCase {
  createUser(command: CreateUserCommand): Promise<UserId>;
}
