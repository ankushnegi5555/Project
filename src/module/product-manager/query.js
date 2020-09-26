import { UserInputError } from 'apollo-server';

export default {
    getAllProduct : async(parent, args, context) => { 
        try {
            const { options } = args;
            console.log('inside getAllProduct', args, options);
            const { dataSources: { productAPI } } = context;
            const response = await productAPI.getProduct(options);
            return response;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    }
};