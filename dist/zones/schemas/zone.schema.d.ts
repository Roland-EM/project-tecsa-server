import { HydratedDocument } from 'mongoose';
export type ZoneDocument = HydratedDocument<Zone>;
export declare class Zone {
    id: string;
    name: string;
    parentId?: string;
    type: 'zone' | 'group';
    children: string[];
    thumbnail?: string;
    description?: string;
    createdBy: string;
}
export declare const ZoneSchema: import("mongoose").Schema<Zone, import("mongoose").Model<Zone, any, any, any, import("mongoose").Document<unknown, any, Zone, any> & Zone & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Zone, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Zone>, {}> & import("mongoose").FlatRecord<Zone> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
