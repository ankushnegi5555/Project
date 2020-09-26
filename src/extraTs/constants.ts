import { IPermissions } from './interfaces';
const permissions: IPermissions = {
    'getUsers': {
    all: ['owner'],
    read : ['user', 'product-manager'],
    write : ['user'],
    delete: ['owner'],
    },
    'getProducts': {
    all: ['product-manager'],
    read : ['user', 'owner'],
    write : ['product-manager'],
    delete: ['product-manager'],
    },
    'getOrders': {
    all: ['user'],
    read : ['user', 'owner', 'product-manager'],
    write : ['user'],
    delete: ['user'],
    }
};
export { permissions };