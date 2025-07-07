"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnxAdapterService = void 0;
const common_1 = require("@nestjs/common");
let KnxAdapterService = class KnxAdapterService {
    constructor() {
        this.connections = new Map();
    }
    async sendCommand(device, command) {
        console.log(`Sending KNX command to device ${device.id}:`, command);
        const result = {
            success: true,
            deviceId: device.id,
            action: command.action,
            params: command.params,
            protocol: 'KNX',
            timestamp: new Date().toISOString(),
        };
        return result;
    }
    async getStatus(device) {
        console.log(`Reading KNX status for device ${device.id}`);
        return {
            deviceId: device.id,
            status: device.data || {},
            online: device.online,
            protocol: 'KNX',
            timestamp: new Date().toISOString(),
        };
    }
    async connect(config) {
        console.log('Connecting to KNX gateway:', config);
    }
    async disconnect() {
        console.log('Disconnecting from KNX gateway');
        this.connections.clear();
    }
};
exports.KnxAdapterService = KnxAdapterService;
exports.KnxAdapterService = KnxAdapterService = __decorate([
    (0, common_1.Injectable)()
], KnxAdapterService);
//# sourceMappingURL=knx-adapter.service.js.map