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
exports.ControlController = void 0;
const common_1 = require("@nestjs/common");
const control_service_1 = require("./control.service");
const create_user_dto_1 = require("../users/dto/create-user.dto");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const role_enum_1 = require("../core/enums/role.enum");
const swagger_1 = require("@nestjs/swagger");
let ControlController = class ControlController {
    constructor(controlService) {
        this.controlService = controlService;
    }
    createUser(createUserDto) {
        return this.controlService.createUser(createUserDto);
    }
    getAllUsers() {
        return this.controlService.getAllUsers();
    }
    resetUserPassword(id, body) {
        return this.controlService.resetUserPassword(id, body.password);
    }
    changeUserRole(id, body) {
        return this.controlService.changeUserRole(id, body.role);
    }
    deactivateUser(id) {
        return this.controlService.deactivateUser(id);
    }
    activateUser(id) {
        return this.controlService.activateUser(id);
    }
    getAuditLogs() {
        return this.controlService.getAuditLogs();
    }
};
exports.ControlController = ControlController;
__decorate([
    (0, common_1.Post)('users'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], ControlController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ControlController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Patch)('users/:id/reset-password'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ControlController.prototype, "resetUserPassword", null);
__decorate([
    (0, common_1.Patch)('users/:id/role'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ControlController.prototype, "changeUserRole", null);
__decorate([
    (0, common_1.Patch)('users/:id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ControlController.prototype, "deactivateUser", null);
__decorate([
    (0, common_1.Patch)('users/:id/activate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ControlController.prototype, "activateUser", null);
__decorate([
    (0, common_1.Get)('audit-logs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ControlController.prototype, "getAuditLogs", null);
exports.ControlController = ControlController = __decorate([
    (0, swagger_1.ApiTags)('control'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('control'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER),
    __metadata("design:paramtypes", [control_service_1.ControlService])
], ControlController);
//# sourceMappingURL=control.controller.js.map