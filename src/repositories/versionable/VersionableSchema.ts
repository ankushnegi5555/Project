import * as mongoose from 'mongoose';

export default class VersionableSchema extends mongoose.Schema {
  constructor(schema, options: any) {
    const baseSchema = {
      createdAt: Date,
      createdBy: String,
      updatedAt: Date,
      updatedBy: String,
      deletedAt: Date,
      deletedBy: String,
      originalId: String
    };
    super({ ...schema, ...baseSchema }, options);
  }
}
