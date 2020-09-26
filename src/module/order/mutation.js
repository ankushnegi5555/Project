import PubSub from '../pubsub';
import { UserInputError } from 'apollo-server';
import constant from '../../lib/constant';

export default {
    createOrder: async( parent, args, context ) => {
        try{
            const { order } = args;
            const { dataSources: { orderAPI } } = context;
            const addOrder = await orderAPI.createOrder(order);
            PubSub.publish(constant.subscriptions.ORDER_ADDED, { orderAdded: addOrder });
            return addOrder;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    },

    deleteOrder: async( parent, args, context ) => {
        try {
            const { id } = args;
            console.log('inside delete order', args, id);
            const { dataSources: { orderAPI } } = context;
            const deleteOrder = await orderAPI.deleteOrder({id});
            PubSub.publish(constant.subscriptions.ORDER_DELETED, { orderDeleted: deleteOrder });
            return deleteOrder;
        }
        catch(error) {
            return new UserInputError('Invalid Arguments', { invalidArgs: Object.keys(args) });
        }
    }
};