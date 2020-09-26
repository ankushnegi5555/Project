import VersionableSchema from '../versionable/VersionableSchema';

export default class UserSchema extends VersionableSchema {
  constructor(options: any) {
    const userSchema = {
      email: String,
      name: String,
      role: String,
      address: String,
      dob: Date,
      password: String
    };
    super(userSchema, options);
  }
}
