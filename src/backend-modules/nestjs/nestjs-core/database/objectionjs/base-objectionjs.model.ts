import { Model } from 'objection';

export abstract class BaseObjectionjsModel extends Model {
  static get idColumn() {
    return 'id';
  }

  id: string;
}
