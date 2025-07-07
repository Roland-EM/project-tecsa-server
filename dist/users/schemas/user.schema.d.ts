import { HydratedDocument } from 'mongoose';
import { Role } from '@core/enums/role.enum';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    id: string;
    username: string;
    passwordHash: string;
    role: Role;
    theme: string;
    email: string;
    phone: string;
    dateRegistered: Date;
    isActive: boolean;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, import("mongoose").Document<unknown, any, User, any> & User & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<User>, {}> & import("mongoose").FlatRecord<User> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
