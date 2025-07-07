import { Model } from 'mongoose';
import { Zone, ZoneDocument } from './schemas/zone.schema';
import { CreateZoneDto } from './dto/create-zone.dto';
export declare class ZonesService {
    private zoneModel;
    constructor(zoneModel: Model<ZoneDocument>);
    create(createZoneDto: CreateZoneDto, userId: string): Promise<Zone>;
    findAll(): Promise<Zone[]>;
    findOne(id: string): Promise<Zone>;
    findByParent(parentId: string): Promise<Zone[]>;
    getRootZones(): Promise<Zone[]>;
    getHierarchy(): Promise<any[]>;
    update(id: string, updateZoneDto: Partial<CreateZoneDto>): Promise<Zone>;
    remove(id: string): Promise<void>;
}
