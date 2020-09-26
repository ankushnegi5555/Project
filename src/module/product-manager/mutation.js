import PubSub from '../pubsub';
import { UserInputError } from 'apollo-server';
import constant from '../../lib/constant';

export default {
    createProduct: async( parent, args, context ) => {
        try{
            const { product } = args;
            console.log('value of create product', args);
            const { dataSources: { productAPI } } = context;
            const addProduct = await productAPI.createProduct(product);
            PubSub.publish(constant.subscriptions.PRODUCT_ADDED, { productAdded: addProduct });
            return addProduct;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },

    deleteProduct: async( parent, args, context ) => {
        try {
            const { id } = args;
            console.log('value inside deleteProduct', args);
            const { dataSources: { productAPI } } = context;
            const deleteProduct = await productAPI.deleteProduct({id});
            PubSub.publish(constant.subscriptions.PRODUCT_DELETED, { productDeleted: deleteProduct });
            return deleteProduct;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },

    updateProduct: async( parent, args, context ) => {
        try {
            const { dataSources: { productAPI } } = context;
            const updateProduct = await productAPI.updateProduct({...args});
            PubSub.publish(constant.subscriptions.PRODUCT_UPDATED, { productUpdated: updateProduct});
            return updateProduct;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    }
};