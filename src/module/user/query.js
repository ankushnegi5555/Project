import { UserInputError } from 'apollo-server';

export default {
    getMyProfile : async(parent, args, context) => {
        try {
            const { dataSources: { userAPI } } = context;
            const response = await userAPI.getMe();
            console.log('value of response', response)
            return response;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }

    }
};