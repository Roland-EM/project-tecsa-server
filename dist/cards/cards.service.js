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
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const card_template_schema_1 = require("./schemas/card-template.schema");
const role_enum_1 = require("../core/enums/role.enum");
let CardsService = class CardsService {
    constructor(cardTemplateModel) {
        this.cardTemplateModel = cardTemplateModel;
    }
    async onModuleInit() {
        await this.initializeDefaultCards();
    }
    async findAll() {
        return this.cardTemplateModel.find().exec();
    }
    async findByCategory(category) {
        return this.cardTemplateModel.find({ category }).exec();
    }
    async findByRole(role) {
        const roleHierarchy = {
            [role_enum_1.Role.OWNER]: [role_enum_1.Role.OWNER, role_enum_1.Role.ADMIN, role_enum_1.Role.PREMIUM, role_enum_1.Role.NORMAL],
            [role_enum_1.Role.ADMIN]: [role_enum_1.Role.ADMIN, role_enum_1.Role.PREMIUM, role_enum_1.Role.NORMAL],
            [role_enum_1.Role.PREMIUM]: [role_enum_1.Role.PREMIUM, role_enum_1.Role.NORMAL],
            [role_enum_1.Role.NORMAL]: [role_enum_1.Role.NORMAL],
        };
        return this.cardTemplateModel.find({
            minRole: { $in: roleHierarchy[role] || [role_enum_1.Role.NORMAL] },
        }).exec();
    }
    async create(createCardTemplateDto) {
        const cardTemplate = new this.cardTemplateModel(createCardTemplateDto);
        return cardTemplate.save();
    }
    async initializeDefaultCards() {
        const defaultCards = [
            {
                templateId: 'light-switch',
                name: 'Light Switch',
                category: 'lighting',
                minRole: role_enum_1.Role.NORMAL,
                size: { x: 1, y: 1 },
                icon: 'lightbulb',
                description: 'Basic light switch control',
                supportedDeviceTypes: ['light-bulb'],
            },
            {
                templateId: 'dimmer',
                name: 'Dimmer',
                category: 'lighting',
                minRole: role_enum_1.Role.NORMAL,
                size: { x: 1, y: 1 },
                icon: 'adjust',
                description: 'Dimmable light control',
                supportedDeviceTypes: ['dimmable-light'],
            },
            {
                templateId: 'thermostat',
                name: 'Thermostat',
                category: 'climate',
                minRole: role_enum_1.Role.PREMIUM,
                size: { x: 2, y: 1 },
                icon: 'thermometer',
                description: 'Temperature control',
                supportedDeviceTypes: ['thermostat'],
            },
            {
                templateId: 'security-camera',
                name: 'Security Camera',
                category: 'security',
                minRole: role_enum_1.Role.ADMIN,
                size: { x: 2, y: 2 },
                icon: 'camera',
                description: 'Security camera viewer',
                supportedDeviceTypes: ['camera'],
            },
        ];
        for (const card of defaultCards) {
            const existing = await this.cardTemplateModel.findOne({ templateId: card.templateId });
            if (!existing) {
                await this.create(card);
            }
        }
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(card_template_schema_1.CardTemplate.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CardsService);
//# sourceMappingURL=cards.service.js.map