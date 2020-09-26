export interface IPermissions {
    [getUsers: string]: {
        all: string[];
        read: string[];
        write: string[];
        delete: string[];
    };
}