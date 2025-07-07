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
exports.CardTemplateSchema = exports.CardTemplate = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const role_enum_1 = require("../../core/enums/role.enum");
let CardTemplate = class CardTemplate {
};
exports.CardTemplate = CardTemplate;
__decorate([
    (0, mongoose_1.Prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], CardTemplate.prototype, "templateId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardTemplate.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CardTemplate.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: role_enum_1.Role, default: role_enum_1.Role.NORMAL }),
    __metadata("design:type", String)
], CardTemplate.prototype, "minRole", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], CardTemplate.prototype, "size", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CardTemplate.prototype, "icon", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CardTemplate.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, default: {} }),
    __metadata("design:type", Object)
], CardTemplate.prototype, "defaultSettings", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], CardTemplate.prototype, "supportedDeviceTypes", void 0);
exports.CardTemplate = CardTemplate = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], CardTemplate);
exports.CardTemplateSchema = mongoose_1.SchemaFactory.createForClass(CardTemplate);
//# sourceMappingURL=card-template.schema.js.map