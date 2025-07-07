"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../core/enums/role.enum");
let RolesService = class RolesService {
    getRoles() {
        return Object.values(role_enum_1.Role);
    }
    getRoleHierarchy() {
        return {
            [role_enum_1.Role.OWNER]: [role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.PREMIUM, role_enum_1.Role.NORMAL],
            [role_enum_1.Role.ADMIN]: [role_enum_1.Role.ADMIN, role_enum_1.Role.PREMIUM, role_enum_1.Role.NORMAL],
            [role_enum_1.Role.PREMIUM]: [role_enum_1.Role.PREMIUM, role_enum_1.Role.NORMAL],
            [role_enum_1.Role.NORMAL]: [role_enum_1.Role.NORMAL],
        };
    }
    canAccessRole(userRole, targetRole) {
        const hierarchy = this.getRoleHierarchy();
        return hierarchy[userRole]?.includes(targetRole) || false;
    }
    getPermissions(role) {
        const permissions = {
            [role_enum_1.Role.OWNER]: ['*'],
            [role_enum_1.Role.ADMIN]: ['users:read', 'users:write', 'devices:*', 'layouts:*', 'zones:*'],
            [role_enum_1.Role.PREMIUM]: ['devices:read', 'devices:command', 'layouts:*', 'zones:read'],
            [role_enum_1.Role.NORMAL]: ['devices:read', 'layouts:read', 'zones:read'],
        };
        return permissions[role] || [];
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)()
], RolesService);
//# sourceMappingURL=roles.service.js.map