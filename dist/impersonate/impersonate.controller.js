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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpersonateController = void 0;
const common_1 = require("@nestjs/common");
const impersonate_service_1 = require("./impersonate.service");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const role_enum_1 = require("../core/enums/role.enum");
const swagger_1 = require("@nestjs/swagger");
let ImpersonateController = class ImpersonateController {
    constructor(impersonateService) {
        this.impersonateService = impersonateService;
    }
    impersonateUser(req, body) {
        console.log('Impersonating user, request body:', body);
        console.log('Current user:', req.user);
        return this.impersonateService.impersonateUser(req.user.userId || req.user.id, body.targetUserId);
    }
    stopImpersonation(req) {
        console.log('Stopping impersonation, user:', req.user);
        return this.impersonateService.stopImpersonation(req.user.userId || req.user.id);
    }
};
exports.ImpersonateController = ImpersonateController;
__decorate([
    (0, common_1.Post)('start'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ImpersonateController.prototype, "impersonateUser", null);
__decorate([
    (0, common_1.Post)('stop'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ImpersonateController.prototype, "stopImpersonation", null);
exports.ImpersonateController = ImpersonateController = __decorate([
    (0, swagger_1.ApiTags)('impersonate'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('impersonate'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN),
    __metadata("design:paramtypes", [impersonate_service_1.ImpersonateService])
], ImpersonateController);
//# sourceMappingURL=impersonate.controller.js.map