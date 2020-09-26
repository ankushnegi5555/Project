import VersionableSchema from '../versionable/VersionableSchema';

export default class OrderSchema extends VersionableSchema {
  constructor(options: any) {
    const orderSchema = {
      product: String,
      price: Number,
    };
    super(orderSchema, options);
  }
}
