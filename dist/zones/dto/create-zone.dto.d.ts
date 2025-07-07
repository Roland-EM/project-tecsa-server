export declare class CreateZoneDto {
    id: string;
    name: string;
    parentId?: string;
    type: 'zone' | 'group';
    children?: string[];
    thumbnail?: string;
    description?: string;
}
