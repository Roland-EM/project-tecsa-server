"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpersonateService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("../auth/auth.service");
const role_enum_1 = require("../core/enums/role.enum");
let ImpersonateService = class ImpersonateService {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async impersonateUser(moderatorId, targetUserId) {
        const moderator = await this.usersService.findOne(moderatorId);
        const targetUser = await this.usersService.findOne(targetUserId);
        if (!moderator || !targetUser) {
            throw new common_1.NotFoundException('User not found');
        }
        if (moderator.role !== role_enum_1.Role.OWNER && moderator.role !== role_enum_1.Role.ADMIN) {
            throw new common_1.UnauthorizedException('Insufficient permissions to impersonate');
        }
        const roleHierarchy = [role_enum_1.Role.NORMAL, role_enum_1.Role.PREMIUM, role_enum_1.Role.ADMIN, role_enum_1.Role.OWNER];
        const moderatorRoleIndex = roleHierarchy.indexOf(moderator.role);
        const targetRoleIndex = roleHierarchy.indexOf(targetUser.role);
        if (targetRoleIndex >= moderatorRoleIndex) {
            throw new common_1.UnauthorizedException('Cannot impersonate user with higher or equal role');
        }
        const impersonationToken = await this.authService.refresh(targetUser);
        return {
            ...impersonationToken,
            impersonated: true,
            originalUser: {
                id: moderator.id,
                username: moderator.username,
                role: moderator.role,
            },
            targetUser: {
                id: targetUser.id,
                username: targetUser.username,
                role: targetUser.role,
            },
        };
    }
    async stopImpersonation(moderatorId) {
        const moderator = await this.usersService.findOne(moderatorId);
        if (!moderator) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.authService.refresh(moderator);
    }
};
exports.ImpersonateService = ImpersonateService;
exports.ImpersonateService = ImpersonateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], ImpersonateService);
//# sourceMappingURL=impersonate.service.js.map