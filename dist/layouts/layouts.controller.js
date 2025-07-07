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
exports.LayoutsController = void 0;
const common_1 = require("@nestjs/common");
const layouts_service_1 = require("./layouts.service");
const create_layout_dto_1 = require("./dto/create-layout.dto");
const add_card_instance_dto_1 = require("./dto/add-card-instance.dto");
const swagger_1 = require("@nestjs/swagger");
let LayoutsController = class LayoutsController {
    constructor(layoutsService) {
        this.layoutsService = layoutsService;
    }
    findUserLayouts(req, page, zoneId) {
        return this.layoutsService.findUserLayouts(req.user.userId, page, zoneId);
    }
    createLayout(createLayoutDto) {
        return this.layoutsService.createLayout(createLayoutDto);
    }
    addCardInstance(req, page, zoneId, addCardInstanceDto) {
        return this.layoutsService.addCardInstance(req.user.userId, page, zoneId, addCardInstanceDto);
    }
    removeCardInstance(req, page, cardInstanceId, zoneId) {
        return this.layoutsService.removeCardInstance(req.user.userId, page, cardInstanceId, zoneId);
    }
    updateCardInstance(req, page, cardInstanceId, updateData, zoneId) {
        return this.layoutsService.updateCardInstance(req.user.userId, page, cardInstanceId, updateData, zoneId);
    }
    deleteLayout(req, page, zoneId) {
        return this.layoutsService.deleteLayout(req.user.userId, page, zoneId);
    }
};
exports.LayoutsController = LayoutsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('zoneId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], LayoutsController.prototype, "findUserLayouts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_layout_dto_1.CreateLayoutDto]),
    __metadata("design:returntype", void 0)
], LayoutsController.prototype, "createLayout", null);
__decorate([
    (0, common_1.Post)('cards'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('zoneId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, add_card_instance_dto_1.AddCardInstanceDto]),
    __metadata("design:returntype", void 0)
], LayoutsController.prototype, "addCardInstance", null);
__decorate([
    (0, common_1.Delete)(':page/cards/:cardInstanceId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('cardInstanceId')),
    __param(3, (0, common_1.Query)('zoneId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], LayoutsController.prototype, "removeCardInstance", null);
__decorate([
    (0, common_1.Patch)(':page/cards/:cardInstanceId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('cardInstanceId')),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.Query)('zoneId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object, String]),
    __metadata("design:returntype", void 0)
], LayoutsController.prototype, "updateCardInstance", null);
__decorate([
    (0, common_1.Delete)(':page'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Query)('zoneId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], LayoutsController.prototype, "deleteLayout", null);
exports.LayoutsController = LayoutsController = __decorate([
    (0, swagger_1.ApiTags)('layouts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('layouts'),
    __metadata("design:paramtypes", [layouts_service_1.LayoutsService])
], LayoutsController);
//# sourceMappingURL=layouts.controller.js.map