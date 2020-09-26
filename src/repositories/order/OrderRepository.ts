import OrderModel from './OrderModel';
import * as mongoose from 'mongoose';
import VersionableRepository from '../versionable/VersionableRepository';
import IOrderModel from './IOrderModel';

export default class OrderRepository extends VersionableRepository<
  IOrderModel,
  mongoose.Model<IOrderModel>
> {
  constructor() {
    super(OrderModel);
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
