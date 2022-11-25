import { BaseEntity } from '../../core/entities/base.entity';

export type UserId = string;

export class User extends BaseEntity {
  public set password(value: string) {
    this._password = value;
  }
  constructor(
    public readonly id: UserId,
    public username: string,
    private _password: string,
  ) {
    super(id);
  }
}
