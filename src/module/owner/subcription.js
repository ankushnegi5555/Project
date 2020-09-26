import PubSub from '../pubsub';
import constant from '../../lib/constant';

export default {
    userAdded: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.USER_ADDED]
            );
        }
    },
    userUpdated: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.USER_UPDATED]
            );
        }
    },
    userDeleted: {
        subscribe: () => {
            return PubSub.asyncIterator(
                [constant.subscriptions.USER_DELETED]
            );
        }
    },
};