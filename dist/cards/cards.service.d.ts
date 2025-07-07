import { Model } from 'mongoose';
import { CardTemplate, CardTemplateDocument } from './schemas/card-template.schema';
import { CreateCardTemplateDto } from './dto/create-card-template.dto';
import { Role } from '@core/enums/role.enum';
export declare class CardsService {
    private cardTemplateModel;
    constructor(cardTemplateModel: Model<CardTemplateDocument>);
    onModuleInit(): Promise<void>;
    findAll(): Promise<CardTemplate[]>;
    findByCategory(category: string): Promise<CardTemplate[]>;
    findByRole(role: Role): Promise<CardTemplate[]>;
    create(createCardTemplateDto: CreateCardTemplateDto): Promise<CardTemplate>;
    private initializeDefaultCards;
}
