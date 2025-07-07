import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    getRoles(): import("../core/enums/role.enum").Role[];
    getRoleHierarchy(): Record<import("../core/enums/role.enum").Role, import("../core/enums/role.enum").Role[]>;
}
