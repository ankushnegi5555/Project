import ProductModel from './ProductModel';
import * as mongoose from 'mongoose';
import VersionableRepository from '../versionable/VersionableRepository';
import IProductModel from './IProductModel';

export default class ProductRepository extends VersionableRepository<
  IProductModel,
  mongoose.Model<IProductModel>
> {
  constructor() {
    super(ProductModel);
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
