import * as mongoose from 'mongoose';
import IProductModel from './IProductModel';
import ProductSchema from './ProductSchema';

const productschema = new ProductSchema({
  collection: 'product'
});

const ProductModel: mongoose.Model<IProductModel> = mongoose.model<IProductModel>(
  'product',
  productschema,
  'products',
  true
);

export default ProductModel;
