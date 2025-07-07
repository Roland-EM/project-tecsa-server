import { CardInstance } from '../schemas/layout.schema';
export declare class CreateLayoutDto {
    userId: string;
    page: string;
    zoneId?: string;
    cardInstances?: CardInstance[];
}
