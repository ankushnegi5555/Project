import * as mongoose from 'mongoose';
import IOrderModel from './IOrderModel';
import OrderSchema from './OrderSchema';

const orderschema = new OrderSchema({
  collection: 'order'
});

const OrderModel: mongoose.Model<IOrderModel> = mongoose.model<IOrderModel>(
  'order',
  orderschema,
  'orders',
  true
);

export default OrderModel;
