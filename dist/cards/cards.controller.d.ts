import { CardsService } from './cards.service';
import { CreateCardTemplateDto } from './dto/create-card-template.dto';
import { Role } from '@core/enums/role.enum';
export declare class CardsController {
    private readonly cardsService;
    constructor(cardsService: CardsService);
    findAll(category?: string, role?: Role): Promise<import("./schemas/card-template.schema").CardTemplate[]>;
    create(createCardTemplateDto: CreateCardTemplateDto): Promise<import("./schemas/card-template.schema").CardTemplate>;
}
