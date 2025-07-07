import { Model } from 'mongoose';
import { Layout, LayoutDocument, CardInstance } from './schemas/layout.schema';
import { CreateLayoutDto } from './dto/create-layout.dto';
import { AddCardInstanceDto } from './dto/add-card-instance.dto';
export declare class LayoutsService {
    private layoutModel;
    constructor(layoutModel: Model<LayoutDocument>);
    findUserLayouts(userId: string, page?: string, zoneId?: string): Promise<Layout[]>;
    createLayout(createLayoutDto: CreateLayoutDto): Promise<LayoutDocument>;
    addCardInstance(userId: string, page: string, zoneId: string | undefined, addCardInstanceDto: AddCardInstanceDto): Promise<Layout>;
    removeCardInstance(userId: string, page: string, cardInstanceId: string, zoneId?: string): Promise<Layout>;
    updateCardInstance(userId: string, page: string, cardInstanceId: string, updateData: Partial<CardInstance>, zoneId?: string): Promise<Layout>;
    deleteLayout(userId: string, page: string, zoneId?: string): Promise<void>;
}
