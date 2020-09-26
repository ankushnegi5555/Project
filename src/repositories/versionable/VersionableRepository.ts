import * as mongoose from 'mongoose';
import IVersionableDocument from './IVersionableDocument';

export default class VersionableRepository<
  D extends IVersionableDocument,
  M extends mongoose.Model<D>
> {
  private modelType: M;
  constructor(modelType) {
    this.modelType = modelType;
  }

  public async generateId() {
    return await mongoose.Types.ObjectId();
  }

  async create(data) {
    return this.modelType.create(data);
  }

  async findOne(query) {
    return await this.modelType
      .findOne({
        ...query,
        deletedAt: undefined
      })
      .lean();
  }

  async count(data) {
    return await this.modelType.countDocuments(data);
  }

  async update(data) {
    const { id, userId, dataToUpdate, ...restAllData } = data;
    const record = await this.findOne({originalId: id});
    if (record === null || !record) {
      throw new Error(`Record at id ${id} does not exist`);
    }
    const { _id, ...rest } = record;
    this.delete({id, userId});
    return await this.modelType.create({
      ...rest,
      ...dataToUpdate,
      ...restAllData,
    });
  }

  async delete(data) {
    const { id, userId } = data;
    const updatedData: any = {
      deletedAt: new Date(),
      deletedBy: userId,
    };
    return await this.modelType.update(
      {
        originalId: id,
        deletedAt: undefined,
      },
      updatedData,
    );
  }

  async list(query, options) {
    const skip = parseInt(options.skip, 10);
    const limit = parseInt(options.limit, 10);
    options = {
      ...options,
      skip,
      limit,
    };
    const list = await this.modelType
      .find(query, {}, options)
      .collation({locale: 'en'});
    const listCount = list.length;
    return { listCount, list };
  }
}
