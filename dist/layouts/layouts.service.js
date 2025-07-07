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
exports.LayoutsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const layout_schema_1 = require("./schemas/layout.schema");
const uuid_1 = require("uuid");
let LayoutsService = class LayoutsService {
    constructor(layoutModel) {
        this.layoutModel = layoutModel;
    }
    async findUserLayouts(userId, page, zoneId) {
        const filter = { userId };
        if (page)
            filter.page = page;
        if (zoneId)
            filter.zoneId = zoneId;
        const layouts = await this.layoutModel.find(filter).exec();
        return layouts.map(layout => layout.toObject());
    }
    async createLayout(createLayoutDto) {
        const layout = new this.layoutModel(createLayoutDto);
        return layout.save();
    }
    async addCardInstance(userId, page, zoneId, addCardInstanceDto) {
        const cardInstance = {
            cardInstanceId: (0, uuid_1.v4)(),
            ...addCardInstanceDto,
        };
        const existingLayout = await this.layoutModel.findOne({ userId, page, zoneId });
        let layout;
        if (!existingLayout) {
            layout = await this.createLayout({ userId, page, zoneId, cardInstances: [cardInstance] });
        }
        else {
            layout = existingLayout;
            layout.cardInstances.push(cardInstance);
            await layout.save();
        }
        return layout.toObject();
    }
    async removeCardInstance(userId, page, cardInstanceId, zoneId) {
        const layout = await this.layoutModel.findOne({ userId, page, zoneId });
        if (!layout) {
            throw new common_1.NotFoundException('Layout not found');
        }
        layout.cardInstances = layout.cardInstances.filter((card) => card.cardInstanceId !== cardInstanceId);
        const savedLayout = await layout.save();
        return savedLayout.toObject();
    }
    async updateCardInstance(userId, page, cardInstanceId, updateData, zoneId) {
        const layout = await this.layoutModel.findOne({ userId, page, zoneId });
        if (!layout) {
            throw new common_1.NotFoundException('Layout not found');
        }
        const cardIndex = layout.cardInstances.findIndex((card) => card.cardInstanceId === cardInstanceId);
        if (cardIndex === -1) {
            throw new common_1.NotFoundException('Card instance not found');
        }
        layout.cardInstances[cardIndex] = {
            ...layout.cardInstances[cardIndex],
            ...updateData,
        };
        const savedLayout = await layout.save();
        return savedLayout.toObject();
    }
    async deleteLayout(userId, page, zoneId) {
        const result = await this.layoutModel.deleteOne({ userId, page, zoneId });
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException('Layout not found');
        }
    }
};
exports.LayoutsService = LayoutsService;
exports.LayoutsService = LayoutsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(layout_schema_1.Layout.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LayoutsService);
//# sourceMappingURL=layouts.service.js.map