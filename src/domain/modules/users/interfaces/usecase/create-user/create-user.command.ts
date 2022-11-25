import { User } from '../../../user.entity';

export class CreateUserCommand {
  public get user(): User {
    return this._user;
  }
  constructor(private readonly _user: User) {}
}
