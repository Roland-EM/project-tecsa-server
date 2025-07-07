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
exports.ZonesController = void 0;
const common_1 = require("@nestjs/common");
const zones_service_1 = require("./zones.service");
const create_zone_dto_1 = require("./dto/create-zone.dto");
const roles_decorator_1 = require("../shared/decorators/roles.decorator");
const role_enum_1 = require("../core/enums/role.enum");
const swagger_1 = require("@nestjs/swagger");
let ZonesController = class ZonesController {
    constructor(zonesService) {
        this.zonesService = zonesService;
    }
    create(createZoneDto, req) {
        return this.zonesService.create(createZoneDto, req.user.userId || req.user.id);
    }
    findAll(parentId) {
        if (parentId) {
            return this.zonesService.findByParent(parentId);
        }
        return this.zonesService.findAll();
    }
    getHierarchy() {
        return this.zonesService.getHierarchy();
    }
    getRootZones() {
        return this.zonesService.getRootZones();
    }
    findOne(id) {
        return this.zonesService.findOne(id);
    }
    update(id, updateZoneDto) {
        return this.zonesService.update(id, updateZoneDto);
    }
    remove(id) {
        return this.zonesService.remove(id);
    }
};
exports.ZonesController = ZonesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_zone_dto_1.CreateZoneDto, Object]),
    __metadata("design:returntype", void 0)
], ZonesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('parentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ZonesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('hierarchy'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ZonesController.prototype, "getHierarchy", null);
__decorate([
    (0, common_1.Get)('root'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ZonesController.prototype, "getRootZones", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ZonesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ZonesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ZonesController.prototype, "remove", null);
exports.ZonesController = ZonesController = __decorate([
    (0, swagger_1.ApiTags)('zones'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('zones'),
    __metadata("design:paramtypes", [zones_service_1.ZonesService])
], ZonesController);
//# sourceMappingURL=zones.controller.js.map