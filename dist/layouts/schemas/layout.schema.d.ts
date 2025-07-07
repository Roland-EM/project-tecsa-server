import { HydratedDocument } from 'mongoose';
export type LayoutDocument = HydratedDocument<Layout>;
export declare class Layout {
    userId: string;
    page: string;
    zoneId?: string;
    cardInstances: CardInstance[];
    __v?: number;
}
export declare class CardInstance {
    cardInstanceId: string;
    cardTemplateId: string;
    deviceId?: string;
    posX: number;
    posY: number;
    sizeX: number;
    sizeY: number;
    settings?: any;
}
export declare const LayoutSchema: import("mongoose").Schema<Layout, import("mongoose").Model<Layout, any, any, any, import("mongoose").Document<unknown, any, Layout, any> & Layout & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Layout, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Layout>, {}> & import("mongoose").FlatRecord<Layout> & {
    _id: import("mongoose").Types.ObjectId;
}>;
