import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LayoutDocument = HydratedDocument<Layout>;

@Schema({ timestamps: true })
export class Layout {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  page: string; // 'dashboard', 'security', 'zone'

  @Prop()
  zoneId?: string;

  @Prop({ type: [Object], default: [] })
  cardInstances: CardInstance[];

  @Prop()
  __v?: number;
}

export class CardInstance {
  @Prop({ required: true })
  cardInstanceId: string;

  @Prop({ required: true })
  cardTemplateId: string;

  @Prop()
  deviceId?: string;

  @Prop({ required: true })
  posX: number;

  @Prop({ required: true })
  posY: number;

  @Prop({ required: true })
  sizeX: number;

  @Prop({ required: true })
  sizeY: number;

  @Prop({ type: Object, default: {} })
  settings?: any;
}

export const LayoutSchema = SchemaFactory.createForClass(Layout);