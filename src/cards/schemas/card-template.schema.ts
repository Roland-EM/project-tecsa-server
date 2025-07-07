import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '@core/enums/role.enum';

export type CardTemplateDocument = HydratedDocument<CardTemplate>;

@Schema({ timestamps: true })
export class CardTemplate {
  @Prop({ unique: true, required: true })
  templateId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ enum: Role, default: Role.NORMAL })
  minRole: Role;

  @Prop({ type: Object, required: true })
  size: { x: number; y: number };

  @Prop()
  icon: string;

  @Prop()
  description: string;

  @Prop({ type: Object, default: {} })
  defaultSettings: any;

  @Prop({ type: [String], default: [] })
  supportedDeviceTypes: string[];
}

export const CardTemplateSchema = SchemaFactory.createForClass(CardTemplate);