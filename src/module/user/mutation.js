import { UserInputError } from 'apollo-server';

export default {
    loginUser: async( parent, args, context ) => {
        try {
            const { payload: { email, password } } = args;
            const { dataSources: { userAPI } } = context;
            const response = await userAPI.loginUser({ email, password });
            return response;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },

    signUpUser: async( parent, args, context ) => {
        try {
            console.log('inside signup', args);
            const { user } = args;
            const { dataSources: { userAPI } } = context;
            const response = await userAPI.signUpUser(user);
            return response;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    }
};