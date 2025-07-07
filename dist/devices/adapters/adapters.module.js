"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptersModule = void 0;
const common_1 = require("@nestjs/common");
const adapters_service_1 = require("./adapters.service");
const knx_adapter_module_1 = require("../knx-adapter/knx-adapter.module");
const wifi_adapter_module_1 = require("../wifi-adapter/wifi-adapter.module");
let AdaptersModule = class AdaptersModule {
};
exports.AdaptersModule = AdaptersModule;
exports.AdaptersModule = AdaptersModule = __decorate([
    (0, common_1.Module)({
        imports: [knx_adapter_module_1.KnxAdapterModule, wifi_adapter_module_1.WifiAdapterModule],
        providers: [adapters_service_1.AdaptersService],
        exports: [adapters_service_1.AdaptersService],
    })
], AdaptersModule);
//# sourceMappingURL=adapters.module.js.map