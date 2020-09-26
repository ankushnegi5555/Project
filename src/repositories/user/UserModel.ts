import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import UserSchema from './UserSchema';

const userschema = new UserSchema({
  collection: 'user'
});

const UserModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
  'user',
  userschema,
  'users',
  true
);

export default UserModel;
