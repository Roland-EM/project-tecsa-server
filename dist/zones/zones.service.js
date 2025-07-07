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
exports.ZonesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const zone_schema_1 = require("./schemas/zone.schema");
let ZonesService = class ZonesService {
    constructor(zoneModel) {
        this.zoneModel = zoneModel;
    }
    async create(createZoneDto, userId) {
        if (createZoneDto.type === 'zone' && createZoneDto.parentId) {
            const parent = await this.zoneModel.findOne({ id: createZoneDto.parentId });
            if (!parent || parent.type !== 'group') {
                throw new common_1.BadRequestException('Zones can only be created inside groups');
            }
        }
        const zone = new this.zoneModel({
            ...createZoneDto,
            createdBy: userId,
        });
        const savedZone = await zone.save();
        if (createZoneDto.parentId) {
            await this.zoneModel.findOneAndUpdate({ id: createZoneDto.parentId }, { $push: { children: savedZone.id } });
        }
        return savedZone;
    }
    async findAll() {
        return this.zoneModel.find().exec();
    }
    async findOne(id) {
        const zone = await this.zoneModel.findOne({ id }).exec();
        if (!zone) {
            throw new common_1.NotFoundException(`Zone with id ${id} not found`);
        }
        return zone;
    }
    async findByParent(parentId) {
        return this.zoneModel.find({ parentId }).exec();
    }
    async getRootZones() {
        return this.zoneModel.find({ parentId: { $exists: false } }).exec();
    }
    async getHierarchy() {
        const zones = await this.zoneModel.find().exec();
        const buildHierarchy = (parentId) => {
            return zones
                .filter(zone => zone.parentId === parentId)
                .map(zone => ({
                ...zone.toObject(),
                children: buildHierarchy(zone.id),
            }));
        };
        return buildHierarchy();
    }
    async update(id, updateZoneDto) {
        const zone = await this.zoneModel.findOneAndUpdate({ id }, updateZoneDto, { new: true }).exec();
        if (!zone) {
            throw new common_1.NotFoundException(`Zone with id ${id} not found`);
        }
        return zone;
    }
    async remove(id) {
        const zone = await this.findOne(id);
        if (zone.parentId) {
            await this.zoneModel.findOneAndUpdate({ id: zone.parentId }, { $pull: { children: id } });
        }
        for (const childId of zone.children) {
            await this.remove(childId);
        }
        const result = await this.zoneModel.deleteOne({ id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Zone with id ${id} not found`);
        }
    }
};
exports.ZonesService = ZonesService;
exports.ZonesService = ZonesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(zone_schema_1.Zone.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ZonesService);
//# sourceMappingURL=zones.service.js.map