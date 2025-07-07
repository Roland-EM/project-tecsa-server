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
exports.AdaptersService = void 0;
const common_1 = require("@nestjs/common");
const knx_adapter_service_1 = require("../knx-adapter/knx-adapter.service");
const wifi_adapter_service_1 = require("../wifi-adapter/wifi-adapter.service");
let AdaptersService = class AdaptersService {
    constructor(knxAdapter, wifiAdapter) {
        this.knxAdapter = knxAdapter;
        this.wifiAdapter = wifiAdapter;
    }
    async sendCommand(device, command) {
        switch (device.protocol.toLowerCase()) {
            case 'knx':
                return this.knxAdapter.sendCommand(device, command);
            case 'wifi':
                return this.wifiAdapter.sendCommand(device, command);
            default:
                throw new Error(`Unsupported protocol: ${device.protocol}`);
        }
    }
    async getStatus(device) {
        switch (device.protocol.toLowerCase()) {
            case 'knx':
                return this.knxAdapter.getStatus(device);
            case 'wifi':
                return this.wifiAdapter.getStatus(device);
            default:
                throw new Error(`Unsupported protocol: ${device.protocol}`);
        }
    }
};
exports.AdaptersService = AdaptersService;
exports.AdaptersService = AdaptersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [knx_adapter_service_1.KnxAdapterService,
        wifi_adapter_service_1.WifiAdapterService])
], AdaptersService);
//# sourceMappingURL=adapters.service.js.map