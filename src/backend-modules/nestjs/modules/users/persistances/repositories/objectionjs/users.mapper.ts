import { User } from '../../../../../../../domain/modules/users/user.entity';
import { UserModel } from './users.model';

export class UsersMapper {
  static mapToUserEntityFromUserModel(userModel: UserModel): User {
    const user = new User(userModel.id, userModel.username, userModel.password);

    return user;
  }
}
