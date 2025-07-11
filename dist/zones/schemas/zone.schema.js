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
exports.ZoneSchema = exports.Zone = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Zone = class Zone {
};
exports.Zone = Zone;
__decorate([
    (0, mongoose_1.Prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], Zone.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Zone.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Zone.prototype, "parentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: ['zone', 'group'], required: true }),
    __metadata("design:type", String)
], Zone.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Zone.prototype, "children", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Zone.prototype, "thumbnail", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Zone.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Zone.prototype, "createdBy", void 0);
exports.Zone = Zone = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Zone);
exports.ZoneSchema = mongoose_1.SchemaFactory.createForClass(Zone);
//# sourceMappingURL=zone.schema.js.map