import { UserInputError } from 'apollo-server';

export default {
    getAllUser : async(parent, args, context) => { 
        try {
            const { options } = args;
            const { dataSources: { ownerAPI } } = context;
            const response = await ownerAPI.getUser(options);
            console.log('value of response', response);
            return response;
        }
        catch(error) {
            console.log('inside catch', error);
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    }
};