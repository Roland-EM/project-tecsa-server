"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_service_1 = require("./config.service");
const logger_service_1 = require("./logger.service");
const error_interceptor_1 = require("./interceptors/error.interceptor");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const role_guard_1 = require("./guards/role.guard");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            config_service_1.ConfigService,
            logger_service_1.LoggerService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: error_interceptor_1.ErrorInterceptor,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RoleGuard,
            },
        ],
        exports: [config_service_1.ConfigService, logger_service_1.LoggerService],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map