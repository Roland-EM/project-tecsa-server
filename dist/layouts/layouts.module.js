"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const layouts_service_1 = require("./layouts.service");
const layouts_controller_1 = require("./layouts.controller");
const layout_schema_1 = require("./schemas/layout.schema");
let LayoutsModule = class LayoutsModule {
};
exports.LayoutsModule = LayoutsModule;
exports.LayoutsModule = LayoutsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: layout_schema_1.Layout.name, schema: layout_schema_1.LayoutSchema }]),
        ],
        controllers: [layouts_controller_1.LayoutsController],
        providers: [layouts_service_1.LayoutsService],
        exports: [layouts_service_1.LayoutsService],
    })
], LayoutsModule);
//# sourceMappingURL=layouts.module.js.map