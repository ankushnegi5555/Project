import PubSub from '../pubsub';
import constant from '../../lib/constant';

export default {
    productAdded: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.PRODUCT_ADDED]
            );
        }
    },
    productUpdated: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.PRODUCT_UPDATED]
            );
        }
    },
    productDeleted: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.PRODUCT_DELETED]
            );
        }
    },
};