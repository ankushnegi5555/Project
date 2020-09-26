import { UserInputError } from 'apollo-server';

export default {
    getAllOrder : async(parent, args, context) => { 
        try {
            const { options } = args;
            const { dataSources: { orderAPI } } = context;
            const response = await orderAPI.getOrder(options);
            return response;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },
};