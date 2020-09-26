import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import path from 'path';
import * as user from './user';
import * as owner from './owner';
import * as product from './product-manager';
import * as order from './order';

const typesArray = fileLoader(path.join(__dirname, '/**/*.graphql'));
const typeDefs = mergeTypes(typesArray, {all: true});

export default {
    resolvers: {
        Query: {
            ...user.Query,
            ...owner.Query,
            ...product.Query,
            ...order.Query
        },
        Mutation: {
            ...user.Mutation,
            ...owner.Mutation,
            ...product.Mutation,
            ...order.Mutation
        },
        Subscription: {
            ...owner.Subscription,
            ...product.Subscription,
            ...order.Subscription
        }
    },
    typeDefs,
};