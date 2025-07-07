import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
export declare class ZonesController {
    private readonly zonesService;
    constructor(zonesService: ZonesService);
    create(createZoneDto: CreateZoneDto, req: any): Promise<import("./schemas/zone.schema").Zone>;
    findAll(parentId?: string): Promise<import("./schemas/zone.schema").Zone[]>;
    getHierarchy(): Promise<any[]>;
    getRootZones(): Promise<import("./schemas/zone.schema").Zone[]>;
    findOne(id: string): Promise<import("./schemas/zone.schema").Zone>;
    update(id: string, updateZoneDto: Partial<CreateZoneDto>): Promise<import("./schemas/zone.schema").Zone>;
    remove(id: string): Promise<void>;
}
