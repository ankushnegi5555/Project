import { permissions } from '../constants';

export default function hasPermission(moduleName: string, role: string, permissionType: string): boolean {
    const roles: string = permissions[moduleName][permissionType];
    if (roles.includes(role)) {
        return true;
    }
    else {
        const allRoles = permissions[moduleName].all;
        return allRoles.includes(role);
    }
}