import { Injectable } from '@nestjs/common';
import { CreateUserPort } from '../../../../../../../domain/modules/users/interfaces/ports/create-user.port';
import { FindUserPort } from '../../../../../../../domain/modules/users/interfaces/ports/find-user.port';
import { User } from '../../../../../../../domain/modules/users/user.entity';
import { UsersMapper } from './users.mapper';
import { UserModel } from './users.model';

@Injectable()
export class UsersObjectionjsAdapter implements CreateUserPort, FindUserPort {
  private readonly _usersQuery = UserModel.query();

  async createUser(user: User): Promise<string> {
    const { id } = await this._usersQuery.insert(user);

    return id;
  }

  async findUserByUsername(username: string): Promise<User> {
    const userModel = await this._usersQuery.findOne({ username });

    if (!userModel) return null;

    const user = UsersMapper.mapToUserEntityFromUserModel(userModel);

    return user;
  }
}
