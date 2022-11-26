import { User } from '../../../user.entity';

export class CreateUserCommand {
  public get user(): Omit<User, 'id'> {
    return this._user;
  }
  constructor(private readonly _user: Omit<User, 'id'>) {}
}
