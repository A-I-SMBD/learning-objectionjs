import { BaseObjectionjsModel } from '../../../../../nestjs-core/database/objectionjs/base-objectionjs.model';

export class UserModel extends BaseObjectionjsModel {
  username: string;
  password: string;

  static tableName = 'users';
}
