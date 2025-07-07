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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const device_schema_1 = require("./schemas/device.schema");
const adapters_service_1 = require("./adapters/adapters.service");
let DevicesService = class DevicesService {
    constructor(deviceModel, adaptersService) {
        this.deviceModel = deviceModel;
        this.adaptersService = adaptersService;
    }
    async create(createDeviceDto) {
        const device = new this.deviceModel(createDeviceDto);
        return device.save();
    }
    async findAll() {
        return this.deviceModel.find().exec();
    }
    async findOne(id) {
        const device = await this.deviceModel.findOne({ id }).exec();
        if (!device) {
            throw new common_1.NotFoundException(`Device with id ${id} not found`);
        }
        return device;
    }
    async findByZone(zoneId) {
        return this.deviceModel.find({ zoneId }).exec();
    }
    async update(id, updateDeviceDto) {
        const device = await this.deviceModel.findOneAndUpdate({ id }, updateDeviceDto, { new: true }).exec();
        if (!device) {
            throw new common_1.NotFoundException(`Device with id ${id} not found`);
        }
        return device;
    }
    async remove(id) {
        const result = await this.deviceModel.deleteOne({ id }).exec();
        if (result.deletedCount === 0) {
            throw new common_1.NotFoundException(`Device with id ${id} not found`);
        }
    }
    async sendCommand(id, command) {
        const device = await this.findOne(id);
        return this.adaptersService.sendCommand(device, command);
    }
    async updateStatus(id, status) {
        return this.update(id, { data: { ...status } });
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(device_schema_1.Device.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        adapters_service_1.AdaptersService])
], DevicesService);
//# sourceMappingURL=devices.service.js.map