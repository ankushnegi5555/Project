import VersionableSchema from '../versionable/VersionableSchema';

export default class ProductSchema extends VersionableSchema {
  constructor(options: any) {
    const productSchema = {
      name: String,
      price: Number,
      description: String,
      company: String,
      availability: Boolean,
    };
    super(productSchema, options);
  }
}
