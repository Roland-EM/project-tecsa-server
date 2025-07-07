import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '@core/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, type: String })
  passwordHash: string;

  @Prop({ enum: Role, default: Role.NORMAL })
  role: Role;

  @Prop({ default: 'default' })
  theme: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop({ default: Date.now })
  dateRegistered: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);