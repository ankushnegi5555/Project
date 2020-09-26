import PubSub from '../pubsub';
import constant from '../../lib/constant';

export default {
    orderAdded: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.ORDER_ADDED]
            );
        }
    },
    orderDeleted: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.ORDER_DELETED]
            );
        }
    },
};