import PubSub from '../pubsub';
import { UserInputError } from 'apollo-server';
import constant from '../../lib/constant';

export default {
    createUser: async( parent, args, context ) => {
        try{
            const { user } = await args;
            console.log('inside create user', user);
            const { dataSources: { ownerAPI } } = context;
            const addUser = await ownerAPI.createUser(user);
            console.log('inside createUser', addUser);
            PubSub.publish(constant.subscriptions.USER_ADDED, { userAdded: addUser });
            return addUser;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },

    deleteUser: async( parent, args, context ) => {
        try {
            const { id } = args;
            const { dataSources: { ownerAPI } } = context;
            const deleteUser = await ownerAPI.deleteUser({id});
            PubSub.publish(constant.subscriptions.USER_DELETED, { userDeleted: deleteUser });
            return deleteUser;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },

    updateUser: async( parent, args, context ) => {
        try {
            console.log('inside update user', args);
            const { dataSources: { ownerAPI } } = context;
            const updateUser = await ownerAPI.updateUser({...args});
            PubSub.publish(constant.subscriptions.USER_UPDATED, { userUpdated: updateUser});
            return updateUser;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    }
};