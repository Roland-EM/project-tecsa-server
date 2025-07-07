"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const core_module_1 = require("./core/core.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const devices_module_1 = require("./devices/devices.module");
const cards_module_1 = require("./cards/cards.module");
const layouts_module_1 = require("./layouts/layouts.module");
const zones_module_1 = require("./zones/zones.module");
const control_module_1 = require("./control/control.module");
const theme_module_1 = require("./theme/theme.module");
const impersonate_module_1 = require("./impersonate/impersonate.module");
const config_service_1 = require("./core/config.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [core_module_1.CoreModule],
                inject: [config_service_1.ConfigService],
                useFactory: async (configService) => ({
                    uri: configService.mongoUri,
                    serverSelectionTimeoutMS: 5000,
                }),
            }),
            core_module_1.CoreModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            devices_module_1.DevicesModule,
            cards_module_1.CardsModule,
            layouts_module_1.LayoutsModule,
            zones_module_1.ZonesModule,
            control_module_1.ControlModule,
            theme_module_1.ThemeModule,
            impersonate_module_1.ImpersonateModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map