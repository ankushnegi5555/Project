import UserModel from './UserModel';
import * as mongoose from 'mongoose';
import VersionableRepository from '../versionable/VersionableRepository';
import IUserModel from './IUserModel';

export default class UserRepository extends VersionableRepository<
  IUserModel,
  mongoose.Model<IUserModel>
> {
  constructor() {
    super(UserModel);
  }

  create = data => {
    return super.create(data);
  };

  update = data => {
    return super.update(data);
  };

  list = (query, options) => {
    return super.list(query, options);
  };

  delete = data => {
    return super.delete(data);
  };
}
