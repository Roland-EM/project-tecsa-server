import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardTemplate, CardTemplateDocument } from './schemas/card-template.schema';
import { CreateCardTemplateDto } from './dto/create-card-template.dto';
import { Role } from '@core/enums/role.enum';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(CardTemplate.name) private cardTemplateModel: Model<CardTemplateDocument>,
  ) {}

  async onModuleInit() {
    await this.initializeDefaultCards();
  }

  async findAll(): Promise<CardTemplate[]> {
    return this.cardTemplateModel.find().exec();
  }

  async findByCategory(category: string): Promise<CardTemplate[]> {
    return this.cardTemplateModel.find({ category }).exec();
  }

  async findByRole(role: Role): Promise<CardTemplate[]> {
    const roleHierarchy = {
      [Role.OWNER]: [Role.OWNER, Role.ADMIN, Role.PREMIUM, Role.NORMAL],
      [Role.ADMIN]: [Role.ADMIN, Role.PREMIUM, Role.NORMAL],
      [Role.PREMIUM]: [Role.PREMIUM, Role.NORMAL],
      [Role.NORMAL]: [Role.NORMAL],
    };

    return this.cardTemplateModel.find({
      minRole: { $in: roleHierarchy[role] || [Role.NORMAL] },
    }).exec();
  }

  async create(createCardTemplateDto: CreateCardTemplateDto): Promise<CardTemplate> {
    const cardTemplate = new this.cardTemplateModel(createCardTemplateDto);
    return cardTemplate.save();
  }

  private async initializeDefaultCards() {
    const defaultCards = [
      {
        templateId: 'light-switch',
        name: 'Light Switch',
        category: 'lighting',
        minRole: Role.NORMAL,
        size: { x: 1, y: 1 },
        icon: 'lightbulb',
        description: 'Basic light switch control',
        supportedDeviceTypes: ['light-bulb'],
      },
      {
        templateId: 'dimmer',
        name: 'Dimmer',
        category: 'lighting',
        minRole: Role.NORMAL,
        size: { x: 1, y: 1 },
        icon: 'adjust',
        description: 'Dimmable light control',
        supportedDeviceTypes: ['dimmable-light'],
      },
      {
        templateId: 'thermostat',
        name: 'Thermostat',
        category: 'climate',
        minRole: Role.PREMIUM,
        size: { x: 2, y: 1 },
        icon: 'thermometer',
        description: 'Temperature control',
        supportedDeviceTypes: ['thermostat'],
      },
      {
        templateId: 'security-camera',
        name: 'Security Camera',
        category: 'security',
        minRole: Role.ADMIN,
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
}