import { LayoutsService } from './layouts.service';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { AddCardInstanceDto } from './dto/add-card-instance.dto';
export declare class LayoutsController {
    private readonly layoutsService;
    constructor(layoutsService: LayoutsService);
    findUserLayouts(req: any, page?: string, zoneId?: string): Promise<import("./schemas/layout.schema").Layout[]>;
    createLayout(createLayoutDto: CreateLayoutDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/layout.schema").Layout, {}> & import("./schemas/layout.schema").Layout & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addCardInstance(req: any, page: string, zoneId: string, addCardInstanceDto: AddCardInstanceDto): Promise<import("./schemas/layout.schema").Layout>;
    removeCardInstance(req: any, page: string, cardInstanceId: string, zoneId?: string): Promise<import("./schemas/layout.schema").Layout>;
    updateCardInstance(req: any, page: string, cardInstanceId: string, updateData: any, zoneId?: string): Promise<import("./schemas/layout.schema").Layout>;
    deleteLayout(req: any, page: string, zoneId?: string): Promise<void>;
}
