import { HydratedDocument } from 'mongoose';
import { Role } from '@core/enums/role.enum';
export type CardTemplateDocument = HydratedDocument<CardTemplate>;
export declare class CardTemplate {
    templateId: string;
    name: string;
    category: string;
    minRole: Role;
    size: {
        x: number;
        y: number;
    };
    icon: string;
    description: string;
    defaultSettings: any;
    supportedDeviceTypes: string[];
}
export declare const CardTemplateSchema: import("mongoose").Schema<CardTemplate, import("mongoose").Model<CardTemplate, any, any, any, import("mongoose").Document<unknown, any, CardTemplate, any> & CardTemplate & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CardTemplate, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<CardTemplate>, {}> & import("mongoose").FlatRecord<CardTemplate> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
