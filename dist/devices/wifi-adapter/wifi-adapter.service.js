"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WifiAdapterService = void 0;
const common_1 = require("@nestjs/common");
let WifiAdapterService = class WifiAdapterService {
    async sendCommand(device, command) {
        console.log(`Sending WiFi command to device ${device.id}:`, command);
        const result = {
            success: true,
            deviceId: device.id,
            action: command.action,
            params: command.params,
            protocol: 'WiFi',
            timestamp: new Date().toISOString(),
        };
        return result;
    }
    async getStatus(device) {
        console.log(`Reading WiFi status for device ${device.id}`);
        return {
            deviceId: device.id,
            status: device.data || {},
            online: device.online,
            protocol: 'WiFi',
            timestamp: new Date().toISOString(),
        };
    }
    async connect(config) {
        console.log('Connecting to WiFi devices:', config);
    }
    async disconnect() {
        console.log('Disconnecting from WiFi devices');
    }
};
exports.WifiAdapterService = WifiAdapterService;
exports.WifiAdapterService = WifiAdapterService = __decorate([
    (0, common_1.Injectable)()
], WifiAdapterService);
//# sourceMappingURL=wifi-adapter.service.js.map