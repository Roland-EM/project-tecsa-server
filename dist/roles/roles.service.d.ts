import { Role } from '@core/enums/role.enum';
export declare class RolesService {
    getRoles(): Role[];
    getRoleHierarchy(): Record<Role, Role[]>;
    canAccessRole(userRole: Role, targetRole: Role): boolean;
    getPermissions(role: Role): string[];
}
